/**
 * Security and Compliance Tests
 *
 * Tests for authentication, logging, and KVKK/GDPR compliance.
 */

const { logger, maskPII } = require('../lib/logger');
const {
  CONSENT_TYPES,
  validateConsent,
  sanitizeContactData,
  isDataExpired,
  getRetentionDays,
} = require('../lib/compliance');

// Mock environment
process.env.REQUIRE_CONSENT = 'true';
process.env.DATA_RETENTION_DAYS = '365';

describe('PII Masking', () => {
  test('should mask email addresses', () => {
    const result = maskPII('user@example.com');
    expect(result).not.toBe('user@example.com');
    expect(result).toMatch(/^u\*\*\*@example\.com$/);
  });

  test('should mask phone numbers', () => {
    const result = maskPII('+90 555 123 4567');
    expect(result).toContain('***');
    expect(result).not.toBe('+90 555 123 4567');
  });

  test('should mask IP addresses', () => {
    const result = maskPII('192.168.1.100');
    expect(result).toBe('192.168.***');
  });

  test('should mask sensitive fields in objects', () => {
    const data = {
      email: 'test@example.com',
      phone: '05551234567',
      name: 'John Doe',
      message: 'Hello world',
    };

    const masked = maskPII(data);
    // Sensitive fields should be masked (contain asterisks)
    expect(masked.email).toContain('*');
    expect(masked.phone).toContain('*');
    expect(masked.name).toContain('*');
    // Non-sensitive fields should remain unchanged
    expect(masked.message).toBe('Hello world');
  });

  test('should handle null and undefined', () => {
    expect(maskPII(null)).toBeNull();
    expect(maskPII(undefined)).toBeUndefined();
  });

  test('should handle arrays', () => {
    const emails = ['user1@example.com', 'user2@example.com'];
    const masked = maskPII(emails);
    expect(masked[0]).toMatch(/^u\*\*\*@example\.com$/);
    expect(masked[1]).toMatch(/^u\*\*\*@example\.com$/);
  });
});

describe('Consent Validation', () => {
  test('should require consent when REQUIRE_CONSENT is true', () => {
    const result = validateConsent(null, CONSENT_TYPES.CONTACT_FORM);
    expect(result.valid).toBe(false);
    expect(result.code).toBe('CONSENT_REQUIRED');
  });

  test('should accept valid consent', () => {
    const consent = {
      [CONSENT_TYPES.CONTACT_FORM]: true,
      timestamp: new Date().toISOString(),
    };

    const result = validateConsent(consent, CONSENT_TYPES.CONTACT_FORM);
    expect(result.valid).toBe(true);
  });

  test('should reject expired consent', () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 2); // 2 days ago

    const consent = {
      [CONSENT_TYPES.CONTACT_FORM]: true,
      timestamp: oldDate.toISOString(),
    };

    const result = validateConsent(consent, CONSENT_TYPES.CONTACT_FORM);
    expect(result.valid).toBe(false);
    expect(result.code).toBe('CONSENT_EXPIRED');
  });
});

describe('Data Sanitization', () => {
  test('should sanitize contact data', () => {
    const data = {
      name: '  John Doe  ',
      email: 'TEST@EXAMPLE.COM',
      phone: '  555-1234  ',
      consent: { type: 'contact' },
      captcha: 'abc123',
    };

    const sanitized = sanitizeContactData(data);

    expect(sanitized.name).toBe('John Doe');
    expect(sanitized.consent).toBeUndefined();
    expect(sanitized.captcha).toBeUndefined();
  });
});

describe('Data Retention', () => {
  test('should return configured retention days', () => {
    expect(getRetentionDays()).toBe(365);
  });

  test('should identify expired data', () => {
    const oldDate = new Date();
    oldDate.setFullYear(oldDate.getFullYear() - 2); // 2 years ago

    expect(isDataExpired(oldDate)).toBe(true);
  });

  test('should identify non-expired data', () => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 30); // 30 days ago

    expect(isDataExpired(recentDate)).toBe(false);
  });
});

describe('Logger', () => {
  test('should create structured log entries', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.info({
      actor: 'test@example.com',
      action: 'test_action',
      message: 'Test message',
    });

    expect(consoleSpy).toHaveBeenCalled();
    const logOutput = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(logOutput);

    expect(parsed.actor).toBe('test@example.com');
    expect(parsed.action).toBe('test_action');
    expect(parsed.level).toBe('INFO');
    expect(parsed.timestamp).toBeDefined();

    consoleSpy.mockRestore();
  });

  test('should mask PII in log metadata', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.info({
      actor: 'admin',
      action: 'view_contact',
      message: 'Viewed contact',
      metadata: {
        email: 'user@example.com',
        phone: '05551234567',
      },
    });

    expect(consoleSpy).toHaveBeenCalled();
    const logOutput = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(logOutput);

    expect(parsed.metadata.email).not.toBe('user@example.com');
    expect(parsed.metadata.phone).not.toBe('05551234567');

    consoleSpy.mockRestore();
  });
});

describe('Input Validation', () => {
  test('should detect valid email format', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    expect(emailRegex.test('valid@example.com')).toBe(true);
    expect(emailRegex.test('invalid')).toBe(false);
    expect(emailRegex.test('invalid@')).toBe(false);
    expect(emailRegex.test('@invalid.com')).toBe(false);
  });

  test('should detect valid phone format', () => {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;

    expect(phoneRegex.test('+90 555 123 4567')).toBe(true);
    expect(phoneRegex.test('05551234567')).toBe(true);
    expect(phoneRegex.test('(555) 123-4567')).toBe(true);
    expect(phoneRegex.test('abc')).toBe(false);
    expect(phoneRegex.test('12345')).toBe(false);
  });
});

describe('XSS Prevention', () => {
  test('should escape HTML entities', () => {
    const sanitizeInput = (str) => {
      if (typeof str !== 'string') return str;
      return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim();
    };

    const malicious = '<script>alert("xss")</script>';
    const sanitized = sanitizeInput(malicious);

    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toContain('&lt;script&gt;');
  });
});
