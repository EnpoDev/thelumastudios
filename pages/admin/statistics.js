import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { BarChart3, TrendingUp, LogOut, Save } from 'lucide-react';

export default function AdminStatistics() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState([]);
  const [editedStats, setEditedStats] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth?action=session')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin');
        } else {
          setAuthenticated(true);
          loadStatistics();
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStatistics = async () => {
    try {
      const res = await fetch('/api/statistics');
      const data = await res.json();
      setStatistics(data);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const handleUpdate = async (id) => {
    const stat = editedStats[id];
    if (!stat) return;

    try {
      const res = await fetch(`/api/statistics?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stat),
      });
      
      if (res.ok) {
        loadStatistics();
        setEditedStats({});
        alert('Statistic updated successfully!');
      }
    } catch (error) {
      console.error('Error updating statistic:', error);
      alert('Failed to update statistic');
    }
  };

  const handleChange = (id, field, value) => {
    const stat = statistics.find((s) => s.id === id);
    setEditedStats({
      ...editedStats,
      [id]: {
        ...stat,
        ...editedStats[id],
        [field]: field === 'value' || field === 'order_index' ? parseInt(value) : value,
      },
    });
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

  if (!authenticated) return null;

  return (
    <>
      <Head>
        <title>Manage Statistics - Luma Studios</title>
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
                  <Link href="/admin/projects" className="text-gray-300 hover:bg-gray-800/50 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Projects
                  </Link>
                  <Link href="/admin/testimonials" className="text-gray-300 hover:bg-gray-800/50 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Testimonials
                  </Link>
                  <Link href="/admin/statistics" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
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
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
                Manage Statistics
              </h2>
              <p className="text-gray-400 text-lg">Update your company statistics and metrics.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-900/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Icon
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Label (EN)
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Label (TR)
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/30">
                    {statistics.map((stat) => (
                      <tr key={stat.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            defaultValue={stat.icon || ''}
                            onChange={(e) => handleChange(stat.id, 'icon', e.target.value)}
                            className="block w-20 bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-2 px-3 text-white placeholder-gray-500 text-center text-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            placeholder="📊"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            defaultValue={stat.label_en}
                            onChange={(e) => handleChange(stat.id, 'label_en', e.target.value)}
                            className="block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            defaultValue={stat.label_tr}
                            onChange={(e) => handleChange(stat.id, 'label_tr', e.target.value)}
                            className="block w-full bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            defaultValue={stat.value}
                            onChange={(e) => handleChange(stat.id, 'value', e.target.value)}
                            className="block w-24 bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            defaultValue={stat.order_index}
                            onChange={(e) => handleChange(stat.id, 'order_index', e.target.value)}
                            className="block w-20 bg-gray-900/50 border border-gray-700/50 rounded-lg shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleUpdate(stat.id)}
                            disabled={!editedStats[stat.id]}
                            className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                              editedStats[stat.id]
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1'
                                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-6 h-6 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Tips for Managing Statistics</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Make changes to the fields and click Save to update each statistic</li>
                    <li>• Use emojis in the Icon field for better visual appeal (e.g., 📊, 🎯, 👥, ⭐)</li>
                    <li>• Order index determines the display sequence (lower numbers appear first)</li>
                    <li>• Both English and Turkish labels are required for bilingual support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
