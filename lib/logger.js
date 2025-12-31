/**
 * Structured Logger for Luma Studios
 *
 * Provides JSON-formatted logging with PII masking for KVKK/GDPR compliance.
 * All logs include: actor, action, status, timestamp, and optional metadata.
 */

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL] ?? LOG_LEVELS.info;

/**
 * Masks Personally Identifiable Information (PII) in data
 * @param {any} data - Data to mask
 * @returns {any} - Masked data
 */
function maskPII(data) {
  if (!data) return data;

  if (typeof data === 'string') {
    // Mask email addresses
    data = data.replace(
      /([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
      (match, local, domain) => `${local.charAt(0)}***@${domain}`
    );

    // Mask phone numbers (various formats)
    data = data.replace(
      /(\+?[0-9]{1,3}[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/g,
      (match) => match.slice(0, 3) + '***' + match.slice(-2)
    );

    // Mask IP addresses
    data = data.replace(
      /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g,
      (match) => match.split('.').slice(0, 2).join('.') + '.***'
    );

    return data;
  }

  if (Array.isArray(data)) {
    return data.map(maskPII);
  }

  if (typeof data === 'object') {
    const masked = {};
    const sensitiveFields = ['email', 'phone', 'ip', 'password', 'name', 'address'];

    for (const [key, value] of Object.entries(data)) {
      if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
        if (typeof value === 'string') {
          masked[key] = value.length > 2
            ? value.charAt(0) + '*'.repeat(Math.min(value.length - 2, 8)) + value.charAt(value.length - 1)
            : '***';
        } else {
          masked[key] = '***';
        }
      } else {
        masked[key] = maskPII(value);
      }
    }
    return masked;
  }

  return data;
}

/**
 * Creates a structured log entry
 * @param {string} level - Log level
 * @param {Object} params - Log parameters
 */
function createLogEntry(level, { actor, action, status, message, metadata = {}, maskData = true }) {
  const entry = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    actor: actor || 'system',
    action,
    status,
    message,
    metadata: maskData ? maskPII(metadata) : metadata,
    environment: process.env.NODE_ENV || 'development',
  };

  return JSON.stringify(entry);
}

/**
 * Logger instance with methods for each log level
 */
const logger = {
  /**
   * Log an error
   * @param {Object} params - Log parameters
   */
  error({ actor, action, message, metadata = {} }) {
    if (currentLevel >= LOG_LEVELS.error) {
      console.error(createLogEntry('error', { actor, action, status: 'error', message, metadata }));
    }
  },

  /**
   * Log a warning
   * @param {Object} params - Log parameters
   */
  warn({ actor, action, message, metadata = {} }) {
    if (currentLevel >= LOG_LEVELS.warn) {
      console.warn(createLogEntry('warn', { actor, action, status: 'warning', message, metadata }));
    }
  },

  /**
   * Log info
   * @param {Object} params - Log parameters
   */
  info({ actor, action, message, metadata = {} }) {
    if (currentLevel >= LOG_LEVELS.info) {
      console.log(createLogEntry('info', { actor, action, status: 'success', message, metadata }));
    }
  },

  /**
   * Log debug info
   * @param {Object} params - Log parameters
   */
  debug({ actor, action, message, metadata = {} }) {
    if (currentLevel >= LOG_LEVELS.debug) {
      console.log(createLogEntry('debug', { actor, action, status: 'debug', message, metadata }));
    }
  },

  /**
   * Log an audit trail entry (always logged regardless of level)
   * Used for security-sensitive actions
   * @param {Object} params - Audit parameters
   */
  audit({ actor, action, resource, resourceId, outcome, ip, userAgent }) {
    const entry = {
      timestamp: new Date().toISOString(),
      type: 'AUDIT',
      actor: maskPII(actor),
      action,
      resource,
      resourceId,
      outcome,
      ip: maskPII(ip),
      userAgent: userAgent?.substring(0, 100),
    };
    console.log(JSON.stringify(entry));
  },

  /**
   * Mask PII utility (exposed for external use)
   */
  maskPII,
};

module.exports = { logger, maskPII };
