import { NextResponse } from 'next/server';
import { getUserFromSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Analysis from '@/models/Analysis';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromSession();
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const analysis = await Analysis.findOne({ _id: params.id, userId: user.userId });
    if (!analysis) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    return NextResponse.json({ data: analysis });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
