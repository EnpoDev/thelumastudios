import { dbHelpers } from '../../lib/db';
import { parse } from 'cookie';

function isAuthenticated(req) {
  const cookies = parse(req.headers.cookie || '');
  return cookies.admin_session === 'authenticated';
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { featured } = req.query;
      const featuredOnly = featured === 'true';
      const testimonials = dbHelpers.getAllTestimonials(featuredOnly ? true : null);
      return res.status(200).json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const result = dbHelpers.createTestimonial(req.body);
      return res.status(201).json({ id: result.lastInsertRowid, ...req.body });
    } catch (error) {
      console.error('Error creating testimonial:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'PUT') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Testimonial ID required' });
      }
      
      dbHelpers.updateTestimonial(parseInt(id), req.body);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating testimonial:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'DELETE') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Testimonial ID required' });
      }
      
      dbHelpers.deleteTestimonial(parseInt(id));
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

