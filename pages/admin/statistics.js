import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function AdminStatistics() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState([]);
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

  const handleUpdate = async (id, field, value) => {
    try {
      const stat = statistics.find((s) => s.id === id);
      const updatedStat = { ...stat, [field]: value };
      
      const res = await fetch(`/api/statistics?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStat),
      });
      
      if (res.ok) {
        loadStatistics();
      }
    } catch (error) {
      console.error('Error updating statistic:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!authenticated) return null;

  return (
    <>
      <Head>
        <title>Manage Statistics - Luma Studios</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/admin/dashboard" className="flex items-center text-xl font-bold text-gray-900">
                  Luma Studios Admin
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/admin/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link href="/admin/projects" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Projects
                  </Link>
                  <Link href="/admin/testimonials" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Testimonials
                  </Link>
                  <Link href="/admin/statistics" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Statistics
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Manage Statistics</h2>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Label (EN)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Label (TR)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Icon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statistics.map((stat) => (
                    <tr key={stat.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          defaultValue={stat.label_en}
                          onBlur={(e) => handleUpdate(stat.id, 'label_en', e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          defaultValue={stat.label_tr}
                          onBlur={(e) => handleUpdate(stat.id, 'label_tr', e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          defaultValue={stat.value}
                          onBlur={(e) => handleUpdate(stat.id, 'value', parseInt(e.target.value))}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          defaultValue={stat.icon || ''}
                          onBlur={(e) => handleUpdate(stat.id, 'icon', e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                          placeholder="📊"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          defaultValue={stat.order_index}
                          onBlur={(e) => handleUpdate(stat.id, 'order_index', parseInt(e.target.value))}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
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

