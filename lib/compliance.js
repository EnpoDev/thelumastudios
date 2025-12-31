/**
 * KVKK/GDPR Compliance Module for Luma Studios
 *
 * Provides data protection utilities including:
 * - Consent validation
 * - Data retention policies
 * - Right to erasure (RTBF)
 * - Data export capabilities
 */

const { logger } = require('./logger');

/**
 * Consent types that can be collected
 */
const CONSENT_TYPES = {
  CONTACT_FORM: 'contact_form',
  MARKETING: 'marketing',
  ANALYTICS: 'analytics',
};

/**
 * Validate that required consent has been given
 * @param {Object} consentData - Consent data from request
 * @param {string} requiredConsent - Type of consent required
 * @returns {Object} - Validation result
 */
function validateConsent(consentData, requiredConsent) {
  const requireConsent = process.env.REQUIRE_CONSENT !== 'false';

  if (!requireConsent) {
    return { valid: true, message: 'Consent requirement disabled' };
  }

  if (!consentData || !consentData[requiredConsent]) {
    return {
      valid: false,
      message: `${requiredConsent} consent is required`,
      code: 'CONSENT_REQUIRED',
    };
  }

  // Check consent timestamp is recent (within last 24 hours for form submissions)
  if (consentData.timestamp) {
    const consentAge = Date.now() - new Date(consentData.timestamp).getTime();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (consentAge > maxAge) {
      return {
        valid: false,
        message: 'Consent has expired, please reconfirm',
        code: 'CONSENT_EXPIRED',
      };
    }
  }

  return { valid: true };
}

/**
 * Get data retention period in days
 * @returns {number} - Retention period in days
 */
function getRetentionDays() {
  return parseInt(process.env.DATA_RETENTION_DAYS) || 365;
}

/**
 * Check if data should be deleted based on retention policy
 * @param {Date|string} createdAt - Creation date
 * @returns {boolean} - True if data should be deleted
 */
function isDataExpired(createdAt) {
  const created = new Date(createdAt);
  const retentionMs = getRetentionDays() * 24 * 60 * 60 * 1000;
  return Date.now() - created.getTime() > retentionMs;
}

/**
 * Generate a consent record for storage
 * @param {string} type - Consent type
 * @param {string} ip - IP address (will be hashed)
 * @param {string} userAgent - User agent string
 * @returns {Object} - Consent record
 */
function createConsentRecord(type, ip, userAgent) {
  const crypto = require('crypto');

  return {
    type,
    timestamp: new Date().toISOString(),
    ipHash: crypto.createHash('sha256').update(ip || 'unknown').digest('hex').substring(0, 16),
    userAgentHash: crypto.createHash('sha256').update(userAgent || 'unknown').digest('hex').substring(0, 16),
    version: '1.0', // Privacy policy version
  };
}

/**
 * Sanitize contact data for storage (remove unnecessary PII)
 * @param {Object} data - Raw contact data
 * @returns {Object} - Sanitized data
 */
function sanitizeContactData(data) {
  const sanitized = { ...data };

  // Remove any fields that shouldn't be stored
  delete sanitized.consent; // Store consent separately
  delete sanitized.captcha;
  delete sanitized._csrf;

  // Trim all string fields
  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      sanitized[key] = value.trim();
    }
  }

  return sanitized;
}

/**
 * Create a KVKK/GDPR compliant data export
 * @param {Object} data - User data to export
 * @returns {Object} - Exportable data package
 */
function createDataExport(data) {
  return {
    exportedAt: new Date().toISOString(),
    exportVersion: '1.0',
    dataController: 'Luma Studios',
    data: {
      personal: data,
    },
    rights: {
      erasure: 'You can request deletion of your data at any time',
      rectification: 'You can request correction of inaccurate data',
      portability: 'This export allows you to transfer your data',
    },
  };
}

/**
 * Privacy notice text for different locales
 */
const PRIVACY_NOTICES = {
  en: {
    contactForm: 'By submitting this form, you agree to our processing of your personal data in accordance with our Privacy Policy. Your data will be retained for {days} days.',
    dataUsage: 'We use your data solely to respond to your inquiry and provide our services.',
  },
  tr: {
    contactForm: 'Bu formu g\u00f6ndererek, ki\u015fisel verilerinizin Gizlilik Politikam\u0131z do\u011frultusunda i\u015flenmesini kabul ediyorsunuz. Verileriniz {days} g\u00fcn s\u00fcreyle saklanacakt\u0131r.',
    dataUsage: 'Verilerinizi yaln\u0131zca talebinize yan\u0131t vermek ve hizmetlerimizi sunmak i\u00e7in kullan\u0131yoruz.',
  },
};

/**
 * Get localized privacy notice
 * @param {string} locale - Locale code (en/tr)
 * @param {string} type - Notice type
 * @returns {string} - Localized notice
 */
function getPrivacyNotice(locale, type) {
  const notices = PRIVACY_NOTICES[locale] || PRIVACY_NOTICES.en;
  const notice = notices[type] || '';
  return notice.replace('{days}', getRetentionDays().toString());
}

module.exports = {
  CONSENT_TYPES,
  validateConsent,
  getRetentionDays,
  isDataExpired,
  createConsentRecord,
  sanitizeContactData,
  createDataExport,
  getPrivacyNotice,
};
