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
      <div className="flex justify-between items-center bg-card-bg p-4 border-4 border-foreground shadow-[4px_4px_0px_0px_var(--border)] rounded-sm">
        <h2 className="text-lg font-black uppercase text-foreground">Analysis Results</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="neo-btn py-1.5 px-3 text-xs uppercase border-2 flex items-center space-x-1 rounded-sm shadow-[2px_2px_0px_0px_var(--border)]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy All'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="neo-btn neo-btn-accent py-1.5 px-3 text-xs uppercase border-2 flex items-center space-x-1 text-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .txt</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="neo-card p-6 bg-card-bg border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] rounded-sm">
          <h3 className="text-base font-black uppercase text-foreground mb-3 border-b-2 border-foreground pb-2">Skill Gap Analysis</h3>
          <p className="text-foreground font-medium whitespace-pre-wrap text-sm leading-relaxed">{data.skillGap}</p>
        </div>
        
        <div className="neo-card p-6 bg-card-bg border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] rounded-sm">
          <h3 className="text-base font-black uppercase text-foreground mb-3 border-b-2 border-foreground pb-2">Improved Resume</h3>
          <p className="text-foreground font-mono whitespace-pre-wrap text-sm leading-relaxed">{data.improvedResume}</p>
        </div>
        
        <div className="neo-card p-6 bg-card-bg border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] rounded-sm">
          <h3 className="text-base font-black uppercase text-foreground mb-3 border-b-2 border-foreground pb-2">Interview Tips</h3>
          <p className="text-foreground font-medium whitespace-pre-wrap text-sm leading-relaxed">{data.interviewTips}</p>
        </div>
      </div>
    </div>
  );
}
