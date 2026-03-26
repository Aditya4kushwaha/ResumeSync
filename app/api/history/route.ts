import { NextResponse } from 'next/server';
import { getUserFromSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Analysis from '@/models/Analysis';

export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const history = await Analysis.find({ userId: user.userId }).sort({ createdAt: -1 });

    return NextResponse.json({ history }, { status: 200 });
  } catch (error: any) {
    console.error('History route error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error while fetching history' },
      { status: 500 }
    );
  }
}
