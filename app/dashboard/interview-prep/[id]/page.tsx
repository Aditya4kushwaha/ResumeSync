'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function InterviewPrepPage() {
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

  if (loading) return <div className="text-center py-20 text-gray-400">Loading Interview Prep...</div>;
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link href={`/dashboard/results/${params.id}`} className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Analysis Menu
      </Link>
      
      <div className="flex items-center mb-8">
        <CheckCircle className="h-8 w-8 text-emerald-500 mr-3" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          Interview Preparation
        </h1>
      </div>
      
      <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 shadow-xl whitespace-pre-wrap text-gray-300 leading-relaxed text-lg">
        {data.interviewTips}
      </div>
    </div>
  );
}
