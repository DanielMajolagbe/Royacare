import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();

    // Fetch all documents, sorted by most recent first
    const documents = await db.collection('documents')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ 
      documents,
      count: documents.length
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
} 