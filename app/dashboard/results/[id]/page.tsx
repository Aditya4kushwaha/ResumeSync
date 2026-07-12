'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle, Zap, Sparkles } from 'lucide-react';

export default function ResultsPage() {
  const params = useParams();
  const resultId = params.id as string;

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Back to workspace */}
      <Link href="/dashboard" className="inline-flex items-center text-foreground font-extrabold uppercase text-xs sm:text-sm tracking-wider border-2 border-foreground bg-card-bg px-3 py-1.5 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--border)] transition-all mb-8 rounded-sm">
        <ArrowLeft className="w-4 h-4 mr-2 stroke-[2.5]" /> Start New Analysis
      </Link>
      
      <div className="bg-card-bg border-4 border-foreground p-8 rounded-sm shadow-[8px_8px_0px_0px_var(--border)]">
        <div className="mb-10 text-left">
          <div className="bg-[#C3FF38] text-black border-4 border-black px-4 py-1.5 inline-block tracking-widest font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 rounded-sm">
            Analysis
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground uppercase tracking-tight">Analysis Dashboard</h2>
          <p className="text-muted font-bold uppercase tracking-wider text-xs sm:text-sm mt-2">Select an option below to view the detailed breakdown or download your document.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Comparison Dashboard */}
          <Link 
            href={`/dashboard/comparison/${resultId}`}
            className="neo-card flex flex-col items-center justify-center p-6 border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_var(--border)] transition-all text-black bg-[#C3FF38] group rounded-sm"
          >
            <Sparkles className="h-10 w-10 text-black mb-3 group-hover:scale-110 transition-transform stroke-[2.5]" />
            <span className="font-extrabold uppercase tracking-wider text-sm text-black">Comparison</span>
            <span className="text-[10px] uppercase font-bold text-black/70 mt-1">Side-by-side match score</span>
          </Link>

          {/* Skill Gap */}
          <Link 
            href={`/dashboard/skill-gap/${resultId}`}
            className="neo-card flex flex-col items-center justify-center p-6 border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_var(--border)] transition-all bg-card-bg text-foreground hover:bg-accent group rounded-sm"
          >
            <Zap className="h-10 w-10 text-foreground mb-3 group-hover:scale-110 transition-transform stroke-[2.5]" />
            <span className="font-extrabold uppercase tracking-wider text-sm text-foreground">Skill Gap</span>
            <span className="text-[10px] uppercase font-bold text-muted mt-1">Identify missing skills</span>
          </Link>
          
          {/* Interview Prep */}
          <Link 
            href={`/dashboard/interview-prep/${resultId}`}
            className="neo-card flex flex-col items-center justify-center p-6 border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_var(--border)] transition-all bg-card-bg text-foreground hover:bg-accent group rounded-sm"
          >
            <CheckCircle className="h-10 w-10 text-foreground mb-3 group-hover:scale-110 transition-transform stroke-[2.5]" />
            <span className="font-extrabold uppercase tracking-wider text-sm text-foreground">Interview Prep</span>
            <span className="text-[10px] uppercase font-bold text-muted mt-1">Tailored questions & tips</span>
          </Link>

          {/* Updated Resume */}
          <Link 
            href={`/dashboard/resume/${resultId}`}
            className="neo-card flex flex-col items-center justify-center p-6 border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_var(--border)] transition-all bg-card-bg text-foreground hover:bg-accent group rounded-sm"
          >
            <FileText className="h-10 w-10 text-foreground mb-3 group-hover:scale-110 transition-transform stroke-[2.5]" />
            <span className="font-extrabold uppercase tracking-wider text-sm text-foreground">Optimized Resume</span>
            <span className="text-[10px] uppercase font-bold text-muted mt-1">Download & View PDF</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
