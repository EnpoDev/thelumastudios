import { dbHelpers } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { featureIds } = req.body;
      
      if (!featureIds || !Array.isArray(featureIds)) {
        return res.status(400).json({ error: 'Feature IDs array required' });
      }
      
      const priceRange = dbHelpers.calculatePrice(featureIds);
      return res.status(200).json(priceRange);
    } catch (error) {
      console.error('Error calculating price:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'GET') {
    try {
      const features = dbHelpers.getAllPriceFeatures();
      return res.status(200).json(features);
    } catch (error) {
      console.error('Error fetching price features:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

