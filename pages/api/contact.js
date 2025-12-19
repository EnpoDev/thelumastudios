import { dbHelpers } from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
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
        phone: phone || null,
        subject,
        message,
        created_at: new Date().toISOString(),
        status: 'new'
      });

      // Here you could also send an email notification
      // using a service like SendGrid, Resend, or Nodemailer

      return res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully!',
        contactId 
      });
    } catch (error) {
      console.error('Error saving contact:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'An error occurred while sending your message. Please try again.' 
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
