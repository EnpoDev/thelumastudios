import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

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
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
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
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">Luma Studios Admin</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/admin/dashboard"
                    className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/projects"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/admin/testimonials"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="/admin/statistics"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Statistics
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-4xl">🎨</div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Projects
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {stats.projects}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <Link
                      href="/admin/projects"
                      className="font-medium text-blue-600 hover:text-blue-900"
                    >
                      View all projects
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-4xl">💬</div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Testimonials
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {stats.testimonials}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <Link
                      href="/admin/testimonials"
                      className="font-medium text-blue-600 hover:text-blue-900"
                    >
                      View all testimonials
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/admin/projects"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded text-center"
                >
                  Add New Project
                </Link>
                <Link
                  href="/admin/testimonials"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded text-center"
                >
                  Add New Testimonial
                </Link>
                <Link
                  href="/admin/statistics"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded text-center"
                >
                  Update Statistics
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

