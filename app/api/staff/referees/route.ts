import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { staffId, stage, referees } = await req.json();
    const { db } = await connectToDatabase();

    const operations = referees.map((referee: any, index: number) => ({
      updateOne: {
        filter: {
          staffId,
          stage,
          index
        },
        update: {
          $set: {
            staffId,
            stage,
            index,
            text: referee.text,
            status: 'pending',
            updatedAt: new Date(),
            createdAt: new Date()
          }
        },
        upsert: true
      }
    }));

    await db.collection('referees').bulkWrite(operations);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving referees:', error);
    return NextResponse.json({ error: 'Failed to save referees' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const staffId = searchParams.get('staffId');
    const stage = searchParams.get('stage');
    
    const { db } = await connectToDatabase();
    const referees = await db.collection('referees')
      .find({ 
        staffId, 
        stage: parseInt(stage!) 
      })
      .sort({ index: 1 })
      .toArray();
    
    return NextResponse.json(referees);
  } catch (error) {
    console.error('Error fetching referees:', error);
    return NextResponse.json({ error: 'Failed to fetch referees' }, { status: 500 });
  }
} 