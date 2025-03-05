import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { staffId, name } = await request.json();
    const { db } = await connectToDatabase();

    await db.collection('staff_profiles').updateOne(
      { staffId },
      { $set: { staffId, name } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing staff profile:', error);
    return NextResponse.json({ error: 'Failed to store staff profile' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const staffId = searchParams.get('staffId');

    if (!staffId) {
      return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const profile = await db.collection('staff_profiles').findOne({ staffId });

    return NextResponse.json(profile || { staffId, name: '' });
  } catch (error) {
    console.error('Error fetching staff profile:', error);
    return NextResponse.json({ error: 'Failed to fetch staff profile' }, { status: 500 });
  }
} 