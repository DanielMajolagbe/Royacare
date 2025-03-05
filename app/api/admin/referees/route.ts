import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
  try {
    const { db } = await connectToDatabase();
    const referees = await db.collection('referees')
      .find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(referees);
  } catch (error) {
    console.error('Error fetching referees:', error);
    return NextResponse.json({ error: 'Failed to fetch referees' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { refereeId, status, adminNotes } = await req.json();
    const { db } = await connectToDatabase();

    await db.collection('referees').updateOne(
      { _id: new ObjectId(refereeId) },
      {
        $set: {
          status,
          adminNotes,
          updatedAt: new Date()
        }
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating referee:', error);
    return NextResponse.json({ error: 'Failed to update referee' }, { status: 500 });
  }
} 