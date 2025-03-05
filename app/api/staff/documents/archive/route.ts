import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { documentIds } = await req.json();
    const { db } = await connectToDatabase();

    // Update documents to set archived flag
    const result = await db.collection('documents').updateMany(
      { _id: { $in: documentIds.map((id: string) => id) } },
      { $set: { archived: true, archivedAt: new Date() } }
    );

    return NextResponse.json({ 
      success: true, 
      message: `${result.modifiedCount} documents archived successfully` 
    });
  } catch (error) {
    console.error('Error archiving documents:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to archive documents' },
      { status: 500 }
    );
  }
} 