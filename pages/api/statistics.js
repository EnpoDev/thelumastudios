import { dbHelpers } from '../../lib/db';
import { parse } from 'cookie';

function isAuthenticated(req) {
  const cookies = parse(req.headers.cookie || '');
  return cookies.admin_session === 'authenticated';
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const statistics = dbHelpers.getAllStatistics();
      return res.status(200).json(statistics);
    } catch (error) {
      console.error('Error fetching statistics:', error);
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
        return res.status(400).json({ error: 'Statistic ID required' });
      }
      
      dbHelpers.updateStatistic(parseInt(id), req.body);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating statistic:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

