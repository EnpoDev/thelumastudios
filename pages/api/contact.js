/**
 * Contact Form API Handler
 *
 * Handles contact form submissions with KVKK/GDPR compliance.
 * Includes consent validation, PII masking in logs, and data sanitization.
 *
 * @module api/contact
 */

import { dbHelpers } from '../../lib/db';
import { logger } from '../../lib/logger';
import {
  CONSENT_TYPES,
  validateConsent,
  sanitizeContactData,
  createConsentRecord,
} from '../../lib/compliance';

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (basic validation)
 */
function isValidPhone(phone) {
  // Allow various phone formats: +90 555 123 4567, 05551234567, etc.
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Sanitize input to prevent XSS
 */
function sanitizeInput(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export default async function handler(req, res) {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      allowed: ['POST'],
    });
  }

  try {
    const { name, email, phone, projectType, budget, description, consent } = req.body;

    // ===========================================
    // CONSENT VALIDATION (KVKK/GDPR)
    // ===========================================
    const consentValidation = validateConsent(consent, CONSENT_TYPES.CONTACT_FORM);

    if (!consentValidation.valid) {
      logger.warn({
        actor: 'anonymous',
        action: 'contact_form_consent_missing',
        message: consentValidation.message,
        metadata: { ip: clientIp },
      });

      return res.status(400).json({
        success: false,
        error: 'Consent required',
        message: consentValidation.message,
        code: consentValidation.code,
      });
    }

    // ===========================================
    // INPUT VALIDATION
    // ===========================================
    const errors = [];

    if (!name || name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Name is required (min 2 characters)' });
    }

    if (!email || !isValidEmail(email)) {
      errors.push({ field: 'email', message: 'Valid email is required' });
    }

    if (!phone || !isValidPhone(phone)) {
      errors.push({ field: 'phone', message: 'Valid phone number is required' });
    }

    if (!projectType) {
      errors.push({ field: 'projectType', message: 'Project type is required' });
    }

    if (!budget) {
      errors.push({ field: 'budget', message: 'Budget selection is required' });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors,
      });
    }

    // ===========================================
    // SANITIZE AND STORE DATA
    // ===========================================
    const sanitizedData = sanitizeContactData({
      name: sanitizeInput(name),
      email: sanitizeInput(email.toLowerCase()),
      phone: sanitizeInput(phone),
      subject: `${sanitizeInput(projectType)} - Budget: ${sanitizeInput(budget)}`,
      message: description ? sanitizeInput(description) : 'No description provided',
      created_at: new Date().toISOString(),
      status: 'new',
    });

    // Create consent record for audit trail
    const consentRecord = createConsentRecord(
      CONSENT_TYPES.CONTACT_FORM,
      clientIp,
      userAgent
    );

    // Store in database
    const contactId = dbHelpers.createContact(sanitizedData);

    // Log success (with masked PII)
    logger.info({
      actor: 'visitor',
      action: 'contact_form_submitted',
      message: 'New contact form submission',
      metadata: {
        contactId,
        projectType,
        budget,
        consentGiven: true,
      },
    });

    // Audit trail for compliance
    logger.audit({
      actor: 'visitor',
      action: 'personal_data_collected',
      resource: 'contact',
      resourceId: contactId,
      outcome: 'success',
      ip: clientIp,
      userAgent,
    });

    return res.status(200).json({
      success: true,
      message: 'Your request has been received. We will respond within 24 hours.',
      contactId,
    });
  } catch (error) {
    // Log error without exposing PII
    logger.error({
      actor: 'system',
      action: 'contact_form_error',
      message: 'Failed to process contact form',
      metadata: { error: error.message },
    });

    return res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'An error occurred while processing your request. Please try again.',
    });
  }
}
