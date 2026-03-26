import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300 backdrop-blur-sm mb-8">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
        Align Your Resume with Job Description
      </div>
      
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 mt-4">
        Land Your Dream Job with <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
          AI-Powered Resume Analysis
        </span>
      </h1>
      
      <p className="max-w-2xl text-lg text-gray-300 mb-10 text-balance">
        Instantly identify skill gaps, tailor your resume to specific job descriptions, and generate targeted interview prep questions. Secure your next interview with data-driven insights.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <Link 
          href="/register" 
          className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link 
          href="/login"
          className="inline-flex h-12 items-center justify-center rounded-md border border-gray-700 bg-black/50 px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 backdrop-blur-sm"
        >
          Login
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
        <FeatureCard 
          icon={<FileText className="h-6 w-6 text-emerald-400" />}
          title="Tailored Resumes"
          description="Get an AI-rewritten version of your resume that perfectly matches the job description you're applying for."
        />
        <FeatureCard 
          icon={<Zap className="h-6 w-6 text-emerald-400" />}
          title="Skill Gap Analysis"
          description="Discover exactly which keywords and skills you are missing from the job description before the ATS rejects you."
        />
        <FeatureCard 
          icon={<CheckCircle className="h-6 w-6 text-emerald-400" />}
          title="Interview Prep"
          description="Receive personalized interview questions and tips based on your specific experience and the role requirements."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col p-6 bg-gray-900/40 border border-gray-800 rounded-xl backdrop-blur-sm transition-all hover:bg-gray-900/60 hover:border-gray-700">
      <div className="h-12 w-12 rounded-lg bg-emerald-900/30 flex items-center justify-center mb-4 border border-emerald-800/50">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
