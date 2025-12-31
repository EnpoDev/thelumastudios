/**
 * Authentication Middleware for API Routes
 *
 * Provides secure session validation for admin API endpoints.
 * Uses JWT tokens instead of simple string comparison.
 */

const jwt = require('jsonwebtoken');
const { parse } = require('cookie');
const { logger } = require('../logger');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
const SESSION_EXPIRY = parseInt(process.env.SESSION_EXPIRY) || 604800; // 7 days

/**
 * Generate a secure JWT token for admin session
 * @param {Object} admin - Admin user object
 * @returns {string} - JWT token
 */
function generateToken(admin) {
  return jwt.sign(
    {
      id: admin.id,
      username: admin.username,
      type: 'admin_session',
    },
    JWT_SECRET,
    { expiresIn: SESSION_EXPIRY }
  );
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} - Decoded payload or null if invalid
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Extract session from request cookies
 * @param {Object} req - Request object
 * @returns {Object|null} - Session data or null
 */
function getSession(req) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.admin_session;

    if (!token) {
      return null;
    }

    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

/**
 * Middleware to require authentication
 * Use this wrapper for protected API routes
 *
 * @param {Function} handler - API route handler
 * @returns {Function} - Wrapped handler with auth check
 *
 * @example
 * export default withAuth(async function handler(req, res) {
 *   // req.admin contains the authenticated admin user
 *   const { admin } = req;
 *   res.json({ success: true });
 * });
 */
function withAuth(handler) {
  return async (req, res) => {
    const session = getSession(req);

    if (!session) {
      logger.warn({
        actor: 'anonymous',
        action: 'unauthorized_access',
        message: 'Attempted access to protected resource without valid session',
        metadata: {
          path: req.url,
          method: req.method,
          ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        },
      });

      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Valid authentication required',
      });
    }

    // Attach admin info to request for use in handler
    req.admin = {
      id: session.id,
      username: session.username,
    };

    // Log audit trail for authenticated actions
    logger.audit({
      actor: session.username,
      action: `${req.method} ${req.url}`,
      resource: 'api',
      resourceId: req.url,
      outcome: 'accessed',
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    });

    return handler(req, res);
  };
}

/**
 * Check if request has valid session (without blocking)
 * Useful for conditional logic
 *
 * @param {Object} req - Request object
 * @returns {boolean} - True if authenticated
 */
function isAuthenticated(req) {
  return getSession(req) !== null;
}

module.exports = {
  generateToken,
  verifyToken,
  getSession,
  withAuth,
  isAuthenticated,
};
