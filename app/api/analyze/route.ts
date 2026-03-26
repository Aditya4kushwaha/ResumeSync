import { NextResponse } from 'next/server';
import { analyzeResume } from '@/lib/gemini';
import { getUserFromSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Analysis from '@/models/Analysis';

export async function POST(req: Request) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { resume, jobDescription } = await req.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { message: 'Both Resume and Job Description are required' },
        { status: 400 }
      );
    }

    // Call Gemini API
    const analysisResult = await analyzeResume(resume, jobDescription);

    const safeString = (val: any) => {
      if (typeof val === 'string') return val;
      if (Array.isArray(val)) return val.join('\n\n');
      if (typeof val === 'object' && val !== null) {
        return Object.entries(val).map(([k, v]) => `**${k}**:\n${Array.isArray(v) ? v.join('\n') : JSON.stringify(v)}`).join('\n\n');
      }
      return String(val);
    };

    // Save to DB
    await dbConnect();
    const newAnalysis = await Analysis.create({
      userId: user.userId,
      resume,
      jobDescription,
      skillGap: safeString(analysisResult.skillGapAnalysis),
      improvedResume: safeString(analysisResult.improvedResume),
      interviewTips: safeString(analysisResult.interviewTips),
    });

    return NextResponse.json(
      { message: 'Analysis complete', data: newAnalysis },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Analyze route error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error while analyzing' },
      { status: 500 }
    );
  }
}
