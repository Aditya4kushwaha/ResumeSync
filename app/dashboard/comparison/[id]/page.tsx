'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, AlertTriangle, Copy, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ComparisonPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedOptimized, setCopiedOptimized] = useState(false);

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

  if (loading) return <div className="text-center py-20 font-black uppercase text-foreground">Loading Comparison Dashboard...</div>;
  if (!data) return null;

  // Fallback for older items before schema update
  const score = data.matchScore ?? 65;
  
  // Format matched/missing skills
  const matchedList = data.matchedSkills 
    ? data.matchedSkills.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];
  const missingList = data.missingSkills 
    ? data.missingSkills.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];

  const handleCopyOriginal = () => {
    navigator.clipboard.writeText(data.resume);
    setCopiedOriginal(true);
    setTimeout(() => setCopiedOriginal(false), 2000);
  };

  const handleCopyOptimized = () => {
    navigator.clipboard.writeText(data.improvedResume);
    setCopiedOptimized(true);
    setTimeout(() => setCopiedOptimized(false), 2000);
  };

  // Determine score status color
  let scoreColor = 'bg-red-500';
  let scoreText = 'Critical Match';
  if (score >= 80) {
    scoreColor = 'bg-[#C3FF38] text-black';
    scoreText = 'Excellent Match';
  } else if (score >= 60) {
    scoreColor = 'bg-yellow-400 text-black';
    scoreText = 'Moderate Match';
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Back button */}
      <Link href={`/dashboard/results/${params.id}`} className="inline-flex items-center text-foreground font-extrabold uppercase text-xs sm:text-sm tracking-wider border-2 border-foreground bg-card-bg px-3 py-1.5 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--border)] transition-all mb-8 rounded-sm">
        <ArrowLeft className="w-4 h-4 mr-2 stroke-[2.5]" /> Back to Analysis Menu
      </Link>

      <div className="mb-10 text-left">
        <div className="bg-[#C3FF38] text-black border-4 border-black px-4 py-1.5 inline-block tracking-widest font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 rounded-sm">
          Analytics
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
          Comparison Dashboard
        </h1>
        <p className="text-muted font-bold uppercase tracking-wider text-xs sm:text-sm mt-2">
          Review the compatibility score, keyword overlap, and compare the original and optimized resumes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        
        {/* ATS Compatibility Card */}
        <div className="neo-card p-6 bg-card-bg border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-black uppercase tracking-wider text-foreground mb-6">ATS Compatibility</h3>
          
          {/* Circular Gauge */}
          <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-foreground shadow-[4px_4px_0px_0px_var(--border)] bg-card-bg mb-4">
            <span className="text-4xl font-black tracking-tighter text-foreground">{score}%</span>
          </div>

          <div className={`neo-badge ${scoreColor} border-2 border-black font-extrabold text-xs px-3 py-1 mt-2`}>
            {scoreText}
          </div>
        </div>

        {/* Matched Skills Card */}
        <div className="neo-card p-6 bg-card-bg border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] md:col-span-2">
          <h3 className="text-lg font-black uppercase tracking-wider text-foreground mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 stroke-[2.5]" />
            Keyword Overlap & Skills Matching
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Matched */}
            <div className="space-y-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-green-500 flex items-center">
                Matched Keywords ({matchedList.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchedList.length > 0 ? (
                  matchedList.map((skill: string, index: number) => (
                    <span key={index} className="neo-badge bg-[#C3FF38] text-black border-2 border-black text-[11px] font-extrabold py-1 px-2">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-muted text-xs font-bold uppercase italic">No matched skills detected</span>
                )}
              </div>
            </div>

            {/* Missing */}
            <div className="space-y-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-red-500 flex items-center">
                Missing Keywords ({missingList.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingList.length > 0 ? (
                  missingList.map((skill: string, index: number) => (
                    <span key={index} className="neo-badge bg-red-100 text-red-700 border-2 border-red-500 text-[11px] font-extrabold py-1 px-2">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-muted text-xs font-bold uppercase italic">No missing skills detected</span>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Side-by-Side Resume Comparison */}
      <div className="neo-card p-6 bg-card-bg border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] mb-8">
        <h3 className="text-xl font-black uppercase tracking-wider text-foreground mb-6 flex items-center">
          <Sparkles className="w-5 h-5 text-[#8B5CF6] mr-2 stroke-[2.5]" />
          Side-by-Side Resume View
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Original Resume Container */}
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center bg-zinc-200 p-3 border-2 border-foreground shadow-[2px_2px_0px_0px_var(--border)] rounded-sm">
              <span className="font-extrabold text-sm uppercase tracking-wider text-zinc-700">Original Resume</span>
              <button 
                onClick={handleCopyOriginal}
                className="flex items-center space-x-1.5 px-2.5 py-1 border-2 border-foreground bg-white text-black font-extrabold text-xs uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all rounded-sm"
              >
                {copiedOriginal ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedOriginal ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="border-4 border-foreground bg-white p-4 h-[450px] overflow-y-auto rounded-sm font-mono text-xs text-black whitespace-pre-wrap leading-relaxed">
              {data.resume}
            </div>
          </div>

          {/* Optimized Resume Container */}
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center bg-[#C3FF38] text-black p-3 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-sm">
              <span className="font-extrabold text-sm uppercase tracking-wider text-black">Optimized AI Resume</span>
              <button 
                onClick={handleCopyOptimized}
                className="flex items-center space-x-1.5 px-2.5 py-1 border-2 border-black bg-white text-black font-extrabold text-xs uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all rounded-sm"
              >
                {copiedOptimized ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedOptimized ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="border-4 border-foreground bg-white p-4 h-[450px] overflow-y-auto rounded-sm font-mono text-xs text-black whitespace-pre-wrap leading-relaxed">
              {data.improvedResume}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
