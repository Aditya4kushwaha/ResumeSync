'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle, Zap } from 'lucide-react';

export default function ResultsPage() {
  const params = useParams();
  const resultId = params.id as string;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link href="/dashboard" className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Start New Analysis
      </Link>
      
      <div className="bg-gray-900/40 p-8 rounded-xl border border-emerald-900/50 backdrop-blur-sm shadow-2xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Analysis Dashboard</h2>
          <p className="text-gray-400 text-sm">Select an option below to view the detailed breakdown or download your document.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href={`/dashboard/skill-gap/${resultId}`}
            className="flex flex-col items-center p-6 bg-black border border-gray-800 rounded-lg hover:border-emerald-500 hover:bg-emerald-900/20 transition-all group shadow-lg"
          >
            <Zap className="h-8 w-8 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-emerald-50 font-medium">Skill Gap</span>
            <span className="text-xs text-gray-500 mt-1">Identify missing keywords</span>
          </Link>
          
          <Link 
            href={`/dashboard/interview-prep/${resultId}`}
            className="flex flex-col items-center p-6 bg-black border border-gray-800 rounded-lg hover:border-emerald-500 hover:bg-emerald-900/20 transition-all group shadow-lg"
          >
            <CheckCircle className="h-8 w-8 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-emerald-50 font-medium">Interview Prep</span>
            <span className="text-xs text-gray-500 mt-1">Practice specific questions</span>
          </Link>

          <Link 
            href={`/dashboard/resume/${resultId}`}
            className="flex flex-col items-center p-6 bg-black border border-gray-800 rounded-lg hover:border-emerald-500 hover:bg-emerald-900/20 transition-all group shadow-lg"
          >
            <FileText className="h-8 w-8 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-emerald-50 font-medium">Updated Resume</span>
            <span className="text-xs text-gray-500 mt-1">Download PDF & View</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
