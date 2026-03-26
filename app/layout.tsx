import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'AI Resume Analyzer',
  description: 'Analyze your resume, identify skill gaps, and get interview tips using AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-white min-h-screen bg-black">
        <div className="min-h-screen w-full relative">
          {/* Emerald Depths Background with Top Glow */}
          <div
            className="absolute inset-0 z-0 pointer-events-none fixed"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000',
            }}
          />
          
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
