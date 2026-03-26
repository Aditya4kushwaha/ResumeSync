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
      <Link href={`/dashboard/results/${params.id}`} className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Analysis Menu
      </Link>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-emerald-500 mr-3" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Updated Resume
          </h1>
        </div>
        
        <button 
          onClick={downloadPDF}
          className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium border border-emerald-500 shadow-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Download as PDF
        </button>
      </div>
      
      <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 shadow-xl whitespace-pre-wrap text-gray-300 font-mono text-sm leading-relaxed">
        {data.improvedResume}
      </div>
    </div>
  );
}
