import { authenticateAdmin } from '../../lib/auth';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST' && req.query.action === 'login') {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
      }
      
      const admin = authenticateAdmin(username, password);
      
      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Set session cookie
      const cookie = serialize('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
      
      res.setHeader('Set-Cookie', cookie);
      return res.status(200).json({ success: true, admin });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'POST' && req.query.action === 'logout') {
    const cookie = serialize('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    
    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ success: true });
  }
  
  if (req.method === 'GET' && req.query.action === 'session') {
    const { parse } = require('cookie');
    const cookies = parse(req.headers.cookie || '');
    const isAuthenticated = cookies.admin_session === 'authenticated';
    
    return res.status(200).json({ authenticated: isAuthenticated });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

