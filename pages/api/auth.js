/**
 * Authentication API Handler
 *
 * Handles admin login, logout, and session validation.
 * Uses JWT tokens for secure session management.
 *
 * @module api/auth
 */

import { serialize } from 'cookie';
import { authenticateAdmin } from '../../lib/auth';
import { generateToken, getSession } from '../../lib/middleware/auth';
import { logger } from '../../lib/logger';

// Session cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

/**
 * Rate limiting storage (in-memory, consider Redis for production)
 */
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

/**
 * Check if IP is rate limited
 */
function isRateLimited(ip) {
  const attempts = loginAttempts.get(ip);
  if (!attempts) return false;

  if (Date.now() - attempts.firstAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(ip);
    return false;
  }

  return attempts.count >= MAX_ATTEMPTS;
}

/**
 * Record a login attempt
 */
function recordAttempt(ip, success) {
  if (success) {
    loginAttempts.delete(ip);
    return;
  }

  const attempts = loginAttempts.get(ip) || { count: 0, firstAttempt: Date.now() };
  attempts.count++;
  loginAttempts.set(ip, attempts);
}

export default async function handler(req, res) {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  // ===========================================
  // LOGIN
  // ===========================================
  if (req.method === 'POST' && req.query.action === 'login') {
    try {
      // Rate limiting check
      if (isRateLimited(clientIp)) {
        logger.warn({
          actor: 'anonymous',
          action: 'login_rate_limited',
          message: 'Too many login attempts',
          metadata: { ip: clientIp },
        });

        return res.status(429).json({
          error: 'Too many login attempts',
          message: 'Please try again in 15 minutes',
        });
      }

      const { username, password } = req.body;

      // Input validation
      if (!username || !password) {
        return res.status(400).json({
          error: 'Validation error',
          message: 'Username and password are required',
        });
      }

      // Authenticate
      const admin = authenticateAdmin(username, password);

      if (!admin) {
        recordAttempt(clientIp, false);

        logger.audit({
          actor: username,
          action: 'login_failed',
          resource: 'auth',
          outcome: 'failure',
          ip: clientIp,
          userAgent,
        });

        return res.status(401).json({
          error: 'Authentication failed',
          message: 'Invalid credentials',
        });
      }

      // Generate secure JWT token
      const token = generateToken(admin);
      recordAttempt(clientIp, true);

      // Set session cookie with token
      const cookie = serialize('admin_session', token, {
        ...COOKIE_OPTIONS,
        maxAge: parseInt(process.env.SESSION_EXPIRY) || 604800, // 7 days
      });

      res.setHeader('Set-Cookie', cookie);

      logger.audit({
        actor: admin.username,
        action: 'login_success',
        resource: 'auth',
        outcome: 'success',
        ip: clientIp,
        userAgent,
      });

      // Return admin info (without sensitive data)
      return res.status(200).json({
        success: true,
        admin: {
          id: admin.id,
          username: admin.username,
        },
      });
    } catch (error) {
      logger.error({
        actor: 'system',
        action: 'login_error',
        message: 'Internal error during login',
        metadata: { error: error.message },
      });

      return res.status(500).json({
        error: 'Server error',
        message: 'An unexpected error occurred',
      });
    }
  }

  // ===========================================
  // LOGOUT
  // ===========================================
  if (req.method === 'POST' && req.query.action === 'logout') {
    const session = getSession(req);

    // Clear session cookie
    const cookie = serialize('admin_session', '', {
      ...COOKIE_OPTIONS,
      maxAge: 0,
    });

    res.setHeader('Set-Cookie', cookie);

    if (session) {
      logger.audit({
        actor: session.username,
        action: 'logout',
        resource: 'auth',
        outcome: 'success',
        ip: clientIp,
        userAgent,
      });
    }

    return res.status(200).json({ success: true });
  }

  // ===========================================
  // SESSION CHECK
  // ===========================================
  if (req.method === 'GET' && req.query.action === 'session') {
    const session = getSession(req);

    return res.status(200).json({
      authenticated: session !== null,
      admin: session ? { username: session.username } : null,
    });
  }

  // Method not allowed
  return res.status(405).json({
    error: 'Method not allowed',
    allowed: ['POST', 'GET'],
  });
}
