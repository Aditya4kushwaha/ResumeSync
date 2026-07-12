'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, ArrowLeft, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import Link from 'next/link';

export default function ResumePage() {
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

  const downloadPDF = () => {
    if (!data) return;
    const doc = new jsPDF();
    
    // Set up standard dimensions and wrapping
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Optimized AI Resume", margin, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    
    // Split text based on the width to handle natural newlines and wraps perfectly
    const textLines = doc.splitTextToSize(data.improvedResume, maxLineWidth);
    
    let y = 30;
    for (let i = 0; i < textLines.length; i++) {
        // If we overflow the page height, add a new page
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.text(textLines[i], margin, y);
        y += 6;
    }
    
    doc.save('Optimized_Resume.pdf');
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading Resume Data...</div>;
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Back to analysis menu */}
      <Link href={`/dashboard/results/${params.id}`} className="inline-flex items-center text-foreground font-extrabold uppercase text-xs sm:text-sm tracking-wider border-2 border-foreground bg-card-bg px-3 py-1.5 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--border)] transition-all mb-8 rounded-sm">
        <ArrowLeft className="w-4 h-4 mr-2 stroke-[2.5]" /> Back to Analysis Menu
      </Link>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="text-left">
          <div className="bg-[#C3FF38] text-black border-4 border-black px-4 py-1.5 inline-block tracking-widest font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 rounded-sm">
            Resume
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground flex items-center">
            <FileText className="h-8 w-8 text-foreground mr-3 stroke-[2.5]" />
            Updated Resume
          </h1>
        </div>
        
        <button 
          onClick={downloadPDF}
          className="neo-btn neo-btn-accent py-2.5 px-4 font-black uppercase text-sm border-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center rounded-sm"
        >
          <Download className="w-4 h-4 mr-2 stroke-[2.5]" />
          Download as PDF
        </button>
      </div>
      
      <div className="neo-card p-8 bg-card-bg border-4 border-foreground shadow-[8px_8px_0px_0px_var(--border)] whitespace-pre-wrap text-foreground font-mono text-sm leading-relaxed rounded-sm">
        {data.improvedResume}
      </div>
    </div>
  );
}
