import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { BarChart3, Mail, Trash2, Eye, Check, Clock, X } from 'lucide-react';

export default function AdminContacts() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth?action=session')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin');
        } else {
          setAuthenticated(true);
          loadContacts();
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  const loadContacts = async () => {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch('/api/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      loadContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    try {
      await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' });
      loadContacts();
      setSelectedContact(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      read: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      replied: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return badges[status] || badges.new;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          <p className="mt-4 text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <>
      <Head>
        <title>Contacts - Admin - Luma Studios</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <div className="flex-shrink-0 flex items-center">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Luma Studios Admin
                  </h1>
                </div>
                <div className="hidden sm:flex sm:space-x-1">
                  <Link href="/admin/dashboard" className="text-gray-300 hover:bg-gray-800/50 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Dashboard
                  </Link>
                  <Link href="/admin/contacts" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Contacts
                  </Link>
                  <Link href="/admin/projects" className="text-gray-300 hover:bg-gray-800/50 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Contact Requests</h2>
            <p className="text-gray-400">Manage incoming project requests</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact List */}
            <div className="lg:col-span-2 space-y-4">
              {contacts.length === 0 ? (
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 text-center">
                  <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No contact requests yet</p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`bg-gray-800/50 border rounded-xl p-4 cursor-pointer transition-all hover:border-purple-500/50 ${
                      selectedContact?.id === contact.id ? 'border-purple-500' : 'border-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-semibold">{contact.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusBadge(contact.status)}`}>
                            {contact.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{contact.email}</p>
                        <p className="text-gray-500 text-sm mt-1">{contact.subject}</p>
                      </div>
                      <div className="text-gray-500 text-xs">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Contact Detail */}
            <div className="lg:col-span-1">
              {selectedContact ? (
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Details</h3>
                    <button
                      onClick={() => setSelectedContact(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-500 text-xs uppercase">Name</label>
                      <p className="text-white">{selectedContact.name}</p>
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase">Email</label>
                      <p className="text-white">{selectedContact.email}</p>
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase">Project Type & Budget</label>
                      <p className="text-white">{selectedContact.subject}</p>
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase">Message</label>
                      <p className="text-gray-300 text-sm">{selectedContact.message}</p>
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase">Date</label>
                      <p className="text-white">{new Date(selectedContact.created_at).toLocaleString()}</p>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-gray-700/50 space-y-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(selectedContact.id, 'read')}
                          className="flex-1 flex items-center justify-center gap-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-2 rounded-lg text-sm hover:bg-yellow-500/30 transition-all"
                        >
                          <Clock className="w-4 h-4" />
                          Read
                        </button>
                        <button
                          onClick={() => updateStatus(selectedContact.id, 'replied')}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-2 rounded-lg text-sm hover:bg-green-500/30 transition-all"
                        >
                          <Check className="w-4 h-4" />
                          Replied
                        </button>
                      </div>
                      <button
                        onClick={() => deleteContact(selectedContact.id)}
                        className="w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-lg text-sm hover:bg-red-500/30 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 text-center">
                  <Eye className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Select a contact to view details</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
