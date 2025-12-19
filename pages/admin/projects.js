import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { BarChart3, FolderKanban, Upload, X, LogOut, Plus, Edit2, Trash2, Star } from 'lucide-react';

export default function AdminProjects() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title_en: '',
    title_tr: '',
    description_en: '',
    description_tr: '',
    slug: '',
    hero_image: '',
    gallery_images: [],
    technologies: [],
    client_name: '',
    client_info: '',
    timeline: '',
    featured: false,
  });
  const handleLogout = async () => {
    await fetch('/api/auth?action=logout', { method: 'POST' });
    router.push('/admin');
  };

  useEffect(() => {
    fetch('/api/auth?action=session')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin');
        } else {
          setAuthenticated(true);
          loadProjects();
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
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
      const url = editing
        ? `/api/projects?id=${editing}`
        : '/api/projects';
      const method = editing ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setEditing(null);
        setFormData({
          title_en: '',
          title_tr: '',
          description_en: '',
          description_tr: '',
          slug: '',
          hero_image: '',
          gallery_images: [],
          technologies: [],
          client_name: '',
          client_info: '',
          timeline: '',
          featured: false,
        });
        loadProjects();
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
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
        <title>Manage Projects - Luma Studios</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link href="/admin/dashboard" className="flex-shrink-0 flex items-center">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Luma Studios Admin
                  </h1>
                </Link>
                <div className="hidden sm:flex sm:space-x-1">
                  <Link href="/admin/dashboard" className="text-gray-300 hover:bg-gray-800/50 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Dashboard
                  </Link>
                  <Link href="/admin/projects" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Projects
                  </Link>
                  <Link href="/admin/testimonials" className="text-gray-300 hover:bg-gray-800/50 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Testimonials
                  </Link>
                  <Link href="/admin/statistics" className="text-gray-300 hover:bg-gray-800/50 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Statistics
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-red-600/20 hover:border-red-500/50 border border-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
                  Manage Projects
                </h2>
                <p className="text-gray-400 text-lg">Create and manage your portfolio projects.</p>
              </div>
              <button
                onClick={() => {
                  setEditing(null);
                  setFormData({
                    title_en: '',
                    title_tr: '',
                    description_en: '',
                    description_tr: '',
                    slug: '',
                    hero_image: '',
                    gallery_images: [],
                    technologies: [],
                    client_name: '',
                    client_info: '',
                    timeline: '',
                    featured: false,
                  });
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{editing ? 'Edit Project' : 'New Project'}</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title (EN)</label>
                    <input
                      type="text"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title (TR)</label>
                    <input
                      type="text"
                      value={formData.title_tr}
                      onChange={(e) => setFormData({ ...formData, title_tr: e.target.value })}
                      className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hero Image</label>
                  <div className="space-y-3">
                    {formData.hero_image && (
                      <div className="relative w-full h-56 border-2 border-gray-700/50 rounded-xl overflow-hidden group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formData.hero_image}
                          alt="Hero preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hero_image: '' })}
                          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg text-sm transition-all shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'hero_image')}
                        className="block w-full text-sm text-gray-300 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border file:border-gray-700/50 file:text-sm file:font-semibold file:bg-gray-900/50 file:text-white hover:file:bg-gray-800 transition-all"
                        disabled={uploading}
                      />
                      {uploading && <span className="text-sm text-purple-400 flex items-center"><Upload className="w-4 h-4 mr-1 animate-bounce" />Uploading...</span>}
                    </div>
                    <p className="text-xs text-gray-400">Or enter URL manually:</p>
                    <input
                      type="text"
                      value={formData.hero_image}
                      onChange={(e) => setFormData({ ...formData, hero_image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description (EN)</label>
                    <textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      rows="4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description (TR)</label>
                    <textarea
                      value={formData.description_tr}
                      onChange={(e) => setFormData({ ...formData, description_tr: e.target.value })}
                      className="mt-1 block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      rows="4"
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 bg-gray-900/30 p-4 rounded-lg border border-gray-700/30 hover:border-purple-500/50 transition-all cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="mr-3 w-5 h-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <Star className="w-5 h-5 mr-2 text-yellow-500 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Featured Project</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-1"
                  >
                    {editing ? 'Update' : 'Create'} Project
                  </button>
                  {editing && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(null);
                        setFormData({
                          title_en: '',
                          title_tr: '',
                          description_en: '',
                          description_tr: '',
                          slug: '',
                          hero_image: '',
                          gallery_images: [],
                          technologies: [],
                          client_name: '',
                          client_info: '',
                          timeline: '',
                          featured: false,
                        });
                      }}
                      className="px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl">
              <table className="min-w-full divide-y divide-gray-700/50">
                <thead className="bg-gray-900/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {project.title_en}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {project.slug}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {project.featured ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setEditing(project.id);
                            setFormData({
                              title_en: project.title_en,
                              title_tr: project.title_tr,
                              description_en: project.description_en || '',
                              description_tr: project.description_tr || '',
                              slug: project.slug,
                              hero_image: project.hero_image || '',
                              gallery_images: project.gallery_images || [],
                              technologies: project.technologies || [],
                              client_name: project.client_name || '',
                              client_info: project.client_info || '',
                              timeline: project.timeline || '',
                              featured: project.featured === 1,
                            });
                          }}
                          className="inline-flex items-center text-purple-400 hover:text-purple-300 mr-4 font-semibold transition-colors"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="inline-flex items-center text-red-400 hover:text-red-300 font-semibold transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

