'use client';

import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';

interface AnalysisData {
  skillGap: string;
  improvedResume: string;
  interviewTips: string;
}

export default function AnalysisResult({ data }: { data: AnalysisData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `Skill Gap Analysis:\n${data.skillGap}\n\nImproved Resume:\n${data.improvedResume}\n\nInterview Tips:\n${data.interviewTips}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const textToCopy = `Skill Gap Analysis:\n${data.skillGap}\n\nImproved Resume:\n${data.improvedResume}\n\nInterview Tips:\n${data.interviewTips}`;
    const blob = new Blob([textToCopy], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-analysis.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full mt-8 space-y-6">
      <div className="flex justify-between items-center bg-gray-900/40 p-4 rounded-lg border border-gray-800 backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-emerald-400">Analysis Results</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy All'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download .txt</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-900/40 p-6 rounded-lg border border-gray-800 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-emerald-500 mb-3 border-b border-gray-800 pb-2">Skill Gap Analysis</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{data.skillGap}</p>
        </div>
        
        <div className="bg-gray-900/40 p-6 rounded-lg border border-gray-800 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-emerald-500 mb-3 border-b border-gray-800 pb-2">Improved Resume</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{data.improvedResume}</p>
        </div>
        
        <div className="bg-gray-900/40 p-6 rounded-lg border border-gray-800 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-emerald-500 mb-3 border-b border-gray-800 pb-2">Interview Tips</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{data.interviewTips}</p>
        </div>
      </div>
    </div>
  );
}
