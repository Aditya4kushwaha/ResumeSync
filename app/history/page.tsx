'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
      <div className="mb-8 text-left">
        <div className="bg-[#C3FF38] text-black border-4 border-black px-4 py-1.5 inline-block tracking-widest font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 rounded-sm">
          Archive
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
          Analysis History
        </h1>
        <p className="text-muted font-bold uppercase tracking-wider text-xs sm:text-sm mt-2">
          View your past resume analysis metrics and keyword compliance runs.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="neo-card p-8 bg-card-bg border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] text-center text-muted font-bold uppercase tracking-wider rounded-sm">
          No analysis history found. Run your first analysis from the Dashboard!
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item: any) => (
            <div 
              key={item._id} 
              className="neo-card border-4 border-foreground shadow-[4px_4px_0px_0px_var(--border)] overflow-hidden transition-all bg-card-bg rounded-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_var(--border)]"
            >
              <div 
                className="p-5 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card-bg hover:bg-zinc-50 transition-colors"
                onClick={() => setSelectedId(selectedId === item._id ? null : item._id)}
              >
                <div className="space-y-1">
                  <div className="neo-badge bg-[#C3FF38] text-black border-2 border-black font-extrabold text-[10px] py-0.5 px-2">
                    {new Date(item.createdAt).toLocaleDateString()} {item.matchScore ? `| Match: ${item.matchScore}%` : ''}
                  </div>
                  <div className="text-foreground font-bold text-sm line-clamp-1 mt-1">{item.jobDescription.substring(0, 120)}...</div>
                </div>
                <div className="text-xs uppercase font-extrabold tracking-wider border-2 border-foreground bg-card-bg hover:bg-accent px-3 py-1.5 transition-all shadow-[2px_2px_0px_0px_var(--border)] rounded-sm flex-shrink-0">
                  {selectedId === item._id ? 'Collapse Analysis' : 'View Breakdown'}
                </div>
              </div>
              
              {selectedId === item._id && (
                <div className="p-6 border-t-4 border-foreground bg-background">
                  {/* Redirect directly or show the result */}
                  <div className="flex justify-end mb-4">
                    <Link 
                      href={`/dashboard/results/${item._id}`}
                      className="inline-flex items-center text-xs uppercase font-extrabold tracking-wider border-2 border-foreground bg-[#C3FF38] text-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all rounded-sm"
                    >
                      Open Full Results Menu
                    </Link>
                  </div>
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
