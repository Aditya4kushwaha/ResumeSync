'use client';

import { useEffect, useState } from 'react';
import AnalysisResult from '@/components/AnalysisResult';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/history');
        const data = await res.json();
        if (res.ok) {
          setHistory(data.history);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-400 mt-20">Loading history...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-6">
        Analysis History
      </h1>

      {history.length === 0 ? (
        <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 text-center text-gray-400">
          No analysis history found. Run your first analysis from the Dashboard!
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item: any) => (
            <div key={item._id} className="bg-gray-900/40 border border-gray-800 rounded-lg overflow-hidden transition-all">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-800/50 flex justify-between items-center"
                onClick={() => setSelectedId(selectedId === item._id ? null : item._id)}
              >
                <div>
                  <div className="text-emerald-400 font-medium text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-gray-300 mt-1 line-clamp-1">{item.jobDescription.substring(0, 100)}...</div>
                </div>
                <div className="text-gray-500">
                  {selectedId === item._id ? 'Collapse' : 'View'}
                </div>
              </div>
              
              {selectedId === item._id && (
                <div className="p-4 border-t border-gray-800 bg-black/20">
                  <AnalysisResult data={item} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
