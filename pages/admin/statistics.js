import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { TrendingUp, Save } from 'lucide-react';

export default function AdminStatistics() {
  const [statistics, setStatistics] = useState([]);
  const [editedStats, setEditedStats] = useState({});

  useEffect(() => {
    loadStatistics();
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

  return (
    <AdminLayout title="Statistics">
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
    </AdminLayout>
  );
}
