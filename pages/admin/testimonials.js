import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { MessageSquare, Upload, X, Plus, Edit2, Trash2, Star } from 'lucide-react';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    content_en: '',
    content_tr: '',
    image_url: '',
    rating: 5,
    featured: false,
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      if (res.ok) loadTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, [field]: data.url });
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editing ? `/api/testimonials?id=${editing}` : '/api/testimonials';
      const method = editing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        resetForm();
        loadTestimonials();
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      name: '',
      company: '',
      position: '',
      content_en: '',
      content_tr: '',
      image_url: '',
      rating: 5,
      featured: false,
    });
  };

  const editTestimonial = (testimonial) => {
    setEditing(testimonial.id);
    setFormData({
      name: testimonial.name,
      company: testimonial.company || '',
      position: testimonial.position || '',
      content_en: testimonial.content_en,
      content_tr: testimonial.content_tr,
      image_url: testimonial.image_url || '',
      rating: testimonial.rating,
      featured: testimonial.featured === 1,
    });
  };

  return (
    <AdminLayout title="Testimonials">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
            Manage Testimonials
          </h2>
          <p className="text-gray-400 text-lg">Create and manage customer testimonials.</p>
        </div>
        <button
          onClick={resetForm}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {/* Form */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-10 h-10 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content (EN)</label>
              <textarea
                value={formData.content_en}
                onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content (TR)</label>
              <textarea
                value={formData.content_tr}
                onChange={(e) => setFormData({ ...formData, content_tr: e.target.value })}
                className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows="4"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
            <div className="space-y-3">
              {formData.image_url && (
                <div className="relative w-32 h-32 border-2 border-gray-700/50 rounded-full overflow-hidden group mx-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.image_url} alt="Profile preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: '' })}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg text-xs transition-all shadow-lg"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'image_url')}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border file:border-gray-700/50 file:text-sm file:font-semibold file:bg-gray-900/50 file:text-white hover:file:bg-gray-800 transition-all"
                  disabled={uploading}
                />
                {uploading && <span className="text-sm text-blue-400 flex items-center"><Upload className="w-4 h-4 mr-1 animate-bounce" />Uploading...</span>}
              </div>
              <p className="text-xs text-gray-400">Or enter URL manually:</p>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 bg-gray-900/30 p-4 rounded-lg border border-gray-700/30 hover:border-blue-500/50 transition-all cursor-pointer group h-full">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="mr-3 w-5 h-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                />
                <Star className="w-5 h-5 mr-2 text-yellow-500 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Featured</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              {editing ? 'Update' : 'Create'} Testimonial
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl">
        <table className="min-w-full divide-y divide-gray-700/50">
          <thead className="bg-gray-900/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/30">
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{testimonial.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{testimonial.company || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="text-yellow-500">{'★'.repeat(testimonial.rating)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => editTestimonial(testimonial)} className="inline-flex items-center text-blue-400 hover:text-blue-300 mr-4 font-semibold transition-colors">
                    <Edit2 className="w-4 h-4 mr-1" />Edit
                  </button>
                  <button onClick={() => handleDelete(testimonial.id)} className="inline-flex items-center text-red-400 hover:text-red-300 font-semibold transition-colors">
                    <Trash2 className="w-4 h-4 mr-1" />Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
