import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { BarChart3, FolderKanban, MessageSquare, TrendingUp, LogOut, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ projects: 0, testimonials: 0 });
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    fetch('/api/auth?action=session')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin');
        } else {
          setAuthenticated(true);
          loadStats();
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    try {
      const [projectsRes, testimonialsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/testimonials'),
      ]);
      
      const projects = await projectsRes.json();
      const testimonials = await testimonialsRes.json();
      
      setStats({
        projects: projects.length,
        testimonials: testimonials.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth?action=logout', { method: 'POST' });
    router.push('/admin');
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

  if (!authenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Luma Studios</title>
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
                  <Link
                    href="/admin/dashboard"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/projects"
                    className="text-gray-300 hover:bg-gray-800/50 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/admin/testimonials"
                    className="text-gray-300 hover:bg-gray-800/50 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="/admin/statistics"
                    className="text-gray-300 hover:bg-gray-800/50 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
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
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-lg">Here&apos;s what&apos;s happening with your projects today.</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Projects Card */}
              <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <FolderKanban className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-400 mb-1">Total Projects</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                        {stats.projects}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-700/50">
                    <Link
                      href="/admin/projects"
                      className="flex items-center justify-between text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors group"
                    >
                      <span>Manage projects</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Testimonials Card */}
              <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-400 mb-1">Total Testimonials</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        {stats.testimonials}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-700/50">
                    <Link
                      href="/admin/testimonials"
                      className="flex items-center justify-between text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
                    >
                      <span>Manage testimonials</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/admin/projects"
                  className="group relative bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-xl text-center transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Project</span>
                  </div>
                </Link>
                <Link
                  href="/admin/testimonials"
                  className="group relative bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl text-center transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Testimonial</span>
                  </div>
                </Link>
                <Link
                  href="/admin/statistics"
                  className="group relative bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-4 px-6 rounded-xl text-center transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Update Stats</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

