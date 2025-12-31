import { dbHelpers } from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const contacts = dbHelpers.getAllContacts();
      return res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Contact ID is required' });
      }
      dbHelpers.deleteContact(id);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting contact:', error);
      return res.status(500).json({ error: 'Failed to delete contact' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { id, status } = req.body;
      if (!id || !status) {
        return res.status(400).json({ error: 'Contact ID and status are required' });
      }
      dbHelpers.updateContactStatus(id, status);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating contact:', error);
      return res.status(500).json({ error: 'Failed to update contact' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
