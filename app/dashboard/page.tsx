'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, ArrowRight, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Dynamically load PDF.js client-side
  const loadPdfJs = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if ((window as any).pdfjsLib) {
        resolve((window as any).pdfjsLib);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
      script.onload = () => {
        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        resolve(pdfjsLib);
      };
      script.onerror = () => reject(new Error('Failed to load PDF parser from CDN'));
      document.head.appendChild(script);
    });
  };

  // Dynamically load Mammoth.js client-side
  const loadMammoth = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if ((window as any).mammoth) {
        resolve((window as any).mammoth);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
      script.onload = () => {
        resolve((window as any).mammoth);
      };
      script.onerror = () => reject(new Error('Failed to load DOCX parser from CDN'));
      document.head.appendChild(script);
    });
  };

  // Handle Resume File Upload & Extract Text client-side
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExtracting(true);
    setError('');

    const fileType = file.name.split('.').pop()?.toLowerCase();

    try {
      if (fileType === 'pdf') {
        const fileReader = new FileReader();
        fileReader.onload = async (event) => {
          try {
            const typedarray = new Uint8Array(event.target?.result as ArrayBuffer);
            const pdfjsLib = await loadPdfJs();
            const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
            
            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item: any) => item.str).join(' ');
              text += pageText + '\n';
            }
            
            if (text.trim().length === 0) {
              throw new Error('No text content found in the PDF document. It might be scanned.');
            }
            
            setResume(text.trim());
          } catch (err: any) {
            setError(err.message || 'Error parsing PDF file');
          } finally {
            setExtracting(false);
          }
        };
        fileReader.readAsArrayBuffer(file);
      } 
      else if (fileType === 'docx') {
        const fileReader = new FileReader();
        fileReader.onload = async (event) => {
          try {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            const mammoth = await loadMammoth();
            const result = await mammoth.extractRawText({ arrayBuffer });
            
            if (result.value.trim().length === 0) {
              throw new Error('No text content extracted from DOCX.');
            }
            
            setResume(result.value.trim());
          } catch (err: any) {
            setError(err.message || 'Error parsing DOCX file');
          } finally {
            setExtracting(false);
          }
        };
        fileReader.readAsArrayBuffer(file);
      } 
      else if (fileType === 'txt') {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          setResume((event.target?.result as string) || '');
          setExtracting(false);
        };
        fileReader.readAsText(file);
      } 
      else {
        setError('Unsupported file type. Please upload a PDF, DOCX, or TXT file.');
        setExtracting(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to process file');
      setExtracting(false);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume.trim() || !jobDescription.trim()) {
      setError('Both resume and job description are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Analysis failed');

      router.push(`/dashboard/results/${data.data._id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header Badge */}
      <div className="mb-10 text-left">
        <div className="bg-[#C3FF38] text-black border-4 border-black px-4 py-1.5 inline-block tracking-widest font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 rounded-sm">
          Workspace
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted font-bold uppercase tracking-wider text-xs sm:text-sm mt-2">
          Upload your resume and paste the target job description to run the AI compliance analysis.
        </p>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-8">
        {error && (
          <div className="bg-red-100 border-4 border-red-500 text-red-700 px-5 py-4 rounded-sm text-sm font-bold shadow-[4px_4px_0px_0px_rgba(239,68,68,0.2)]">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Resume Box */}
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <label className="text-sm font-black uppercase tracking-wider text-foreground">
                Your Resume (Text Format)
              </label>
              
              <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 border-2 border-foreground bg-[#C3FF38] text-black font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all rounded-sm">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload PDF / DOCX</span>
                <input 
                  type="file" 
                  accept=".pdf,.docx,.txt" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  disabled={extracting}
                />
              </label>
            </div>
            
            <div className="relative">
              <textarea
                className="w-full h-80 neo-input p-4 font-medium resize-none"
                placeholder={extracting ? "Extracting text from document, please wait..." : "Paste the text of your resume here, or click 'Upload PDF / DOCX' to extract text automatically..."}
                value={extracting ? "Extracting text, please wait..." : resume}
                onChange={(e) => setResume(e.target.value)}
                disabled={extracting}
              />
              {extracting && (
                <div className="absolute inset-0 bg-background/70 flex items-center justify-center border-4 border-foreground rounded-sm">
                  <div className="flex items-center space-x-3 bg-card-bg px-6 py-3 border-2 border-foreground shadow-[3px_3px_0px_0px_var(--border)] rounded-sm">
                    <RefreshCw className="w-5 h-5 animate-spin text-[#8B5CF6]" />
                    <span className="font-extrabold text-sm uppercase tracking-wider text-foreground">Parsing Document...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Job Description Box */}
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-black uppercase tracking-wider text-foreground h-9 flex items-center">
              Target Job Description
            </label>
            <textarea
              className="w-full h-80 neo-input p-4 font-medium resize-none"
              placeholder="Paste the target job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading || extracting}
          className="w-full py-4 px-6 flex items-center justify-center border-4 border-foreground bg-[#8B5CF6] text-white hover:bg-[#7c3aed] font-black text-lg uppercase tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-sm"
        >
          {loading ? (
            <span className="flex items-center space-x-3">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Analyzing Match Compatibility...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>Analyze Match Compliance</span>
              <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
