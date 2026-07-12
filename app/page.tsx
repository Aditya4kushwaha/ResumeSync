import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4 py-12">
      {/* Top Welcome Badge */}
      <div className="inline-flex items-center neo-badge bg-[#C3FF38] text-black border-2 border-black px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-8 select-none rounded-sm">
        <span className="flex h-2.5 w-2.5 rounded-full bg-black mr-2 animate-pulse"></span>
        Align Your Resume with Job Description
      </div>
      
      {/* Hero Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-8 uppercase text-foreground leading-none max-w-4xl">
        Land Your Dream Job with <br className="hidden sm:block" />
        <span className="bg-[#C3FF38] text-black px-4 py-1.5 border-4 border-black inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] my-2 rounded-sm transform -rotate-1">
          AI-Powered Analysis
        </span>
      </h1>
      
      {/* Hero Description */}
      <p className="max-w-2xl text-base sm:text-lg md:text-xl text-muted font-semibold mb-10 text-balance leading-relaxed">
        Instantly identify skill gaps, tailor your resume to specific job descriptions, and generate targeted interview prep questions. Secure your next interview with data-driven insights.
      </p>
      
      {/* Hero CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <Link 
          href="/register" 
          className="inline-flex h-14 items-center justify-center bg-[#8B5CF6] text-white font-black text-base px-8 border-4 border-foreground shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--border)] transition-all uppercase tracking-wider rounded-sm"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5 stroke-[2.5]" />
        </Link>
        <Link 
          href="/login"
          className="inline-flex h-14 items-center justify-center bg-card-bg text-foreground font-black text-base px-8 border-4 border-foreground shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--border)] transition-all uppercase tracking-wider rounded-sm"
        >
          Login
        </Link>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
        <FeatureCard 
          icon={<FileText className="h-6 w-6 text-black" />}
          title="Tailored Resumes"
          description="Get an AI-rewritten version of your resume that perfectly matches the job description you're applying for."
        />
        <FeatureCard 
          icon={<Zap className="h-6 w-6 text-black" />}
          title="Skill Gap Analysis"
          description="Discover exactly which keywords and skills you are missing from the job description before the ATS rejects you."
        />
        <FeatureCard 
          icon={<CheckCircle className="h-6 w-6 text-black" />}
          title="Interview Prep"
          description="Receive personalized interview questions and tips based on your specific experience and the role requirements."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="neo-card p-6 bg-card-bg border-4 border-foreground shadow-[6px_6px_0px_0px_var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_var(--border)] transition-all">
      <div className="h-12 w-12 bg-[#C3FF38] border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-sm">
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase tracking-wide text-foreground mb-2">{title}</h3>
      <p className="text-muted text-sm font-medium leading-relaxed">{description}</p>
    </div>
  );
}
