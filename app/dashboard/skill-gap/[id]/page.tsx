'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SkillGapPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch(`/api/analysis/${params.id}`);
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
        } else {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchAnalysis();
  }, [params.id, router]);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading Skill Gap Analysis...</div>;
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Back to analysis menu */}
      <Link href={`/dashboard/results/${params.id}`} className="inline-flex items-center text-foreground font-extrabold uppercase text-xs sm:text-sm tracking-wider border-2 border-foreground bg-card-bg px-3 py-1.5 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--border)] transition-all mb-8 rounded-sm">
        <ArrowLeft className="w-4 h-4 mr-2 stroke-[2.5]" /> Back to Analysis Menu
      </Link>
      
      <div className="mb-8 text-left">
        <div className="bg-[#C3FF38] text-black border-4 border-black px-4 py-1.5 inline-block tracking-widest font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 rounded-sm">
          Analytics
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground flex items-center">
          <Zap className="h-8 w-8 text-foreground mr-3 stroke-[2.5]" />
          Skill Gap Analysis
        </h1>
      </div>
      
      <div className="neo-card p-8 bg-card-bg border-4 border-foreground shadow-[8px_8px_0px_0px_var(--border)] whitespace-pre-wrap text-foreground leading-relaxed text-base sm:text-lg font-medium rounded-sm">
        {data.skillGap}
      </div>
    </div>
  );
}
