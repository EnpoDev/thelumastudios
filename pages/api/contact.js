import { dbHelpers } from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, projectType, budget, description } = req.body;

      // Validate required fields
      if (!name || !email || !projectType || !budget) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all required fields'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please enter a valid email address'
        });
      }

      // Save to database
      const contactId = dbHelpers.createContact({
        name,
        email,
        phone: null,
        subject: `${projectType} - Budget: ${budget}`,
        message: description || 'No description provided',
        created_at: new Date().toISOString(),
        status: 'new'
      });

      return res.status(200).json({
        success: true,
        message: 'Your request has been sent successfully!',
        contactId
      });
    } catch (error) {
      console.error('Error saving contact:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred. Please try again.'
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
