/**
 * Contacts Admin API Handler
 *
 * Protected API for managing contact submissions.
 * Requires authentication and includes audit logging.
 *
 * @module api/contacts
 */

import { dbHelpers } from '../../lib/db';
import { withAuth } from '../../lib/middleware/auth';
import { logger } from '../../lib/logger';

async function handler(req, res) {
  const { admin } = req;

  // ===========================================
  // GET - List all contacts
  // ===========================================
  if (req.method === 'GET') {
    try {
      const contacts = dbHelpers.getAllContacts();

      logger.info({
        actor: admin.username,
        action: 'contacts_list_viewed',
        message: 'Admin viewed contacts list',
        metadata: { count: contacts.length },
      });

      return res.status(200).json(contacts);
    } catch (error) {
      logger.error({
        actor: admin.username,
        action: 'contacts_list_error',
        message: 'Failed to fetch contacts',
        metadata: { error: error.message },
      });

      return res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  }

  // ===========================================
  // DELETE - Remove a contact
  // ===========================================
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Contact ID is required' });
      }

      // Get contact before deletion for audit
      const contact = dbHelpers.getContactById(id);

      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      dbHelpers.deleteContact(id);

      logger.audit({
        actor: admin.username,
        action: 'contact_deleted',
        resource: 'contact',
        resourceId: id,
        outcome: 'success',
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      logger.error({
        actor: admin.username,
        action: 'contact_delete_error',
        message: 'Failed to delete contact',
        metadata: { error: error.message },
      });

      return res.status(500).json({ error: 'Failed to delete contact' });
    }
  }

  // ===========================================
  // PATCH - Update contact status
  // ===========================================
  if (req.method === 'PATCH') {
    try {
      const { id, status } = req.body;

      if (!id || !status) {
        return res.status(400).json({ error: 'Contact ID and status are required' });
      }

      // Validate status
      const validStatuses = ['new', 'read', 'replied'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error: 'Invalid status',
          validStatuses,
        });
      }

      const contact = dbHelpers.getContactById(id);

      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      dbHelpers.updateContactStatus(id, status);

      logger.audit({
        actor: admin.username,
        action: 'contact_status_updated',
        resource: 'contact',
        resourceId: id,
        outcome: 'success',
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      logger.error({
        actor: admin.username,
        action: 'contact_update_error',
        message: 'Failed to update contact',
        metadata: { error: error.message },
      });

      return res.status(500).json({ error: 'Failed to update contact' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

// Export with authentication middleware
export default withAuth(handler);
