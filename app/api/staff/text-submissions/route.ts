import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const data = await request.json();
    
    // Validate required fields
    if (!data.staffId || !data.content || !data.type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const submission = {
      ...data,
      createdAt: new Date(),
      status: 'pending'
    };

    const result = await db.collection('textSubmissions').insertOne(submission);

    return NextResponse.json({
      success: true,
      submissionId: result.insertedId
    });
  } catch (error) {
    console.error('Error creating text submission:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const staffId = searchParams.get('staffId');
    const type = searchParams.get('type');

    const query: any = {};
    if (staffId) query.staffId = staffId;
    if (type) query.type = type;

    const submissions = await db.collection('textSubmissions')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error fetching text submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
} 