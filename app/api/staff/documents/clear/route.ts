import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/mongoose';
import StaffDocument from '@/lib/models/staffDocument.model';

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    
    const { documentIds } = await request.json();

    if (!documentIds || !Array.isArray(documentIds)) {
      return NextResponse.json(
        { error: 'Invalid document IDs provided' },
        { status: 400 }
      );
    }

    // Update all documents to be archived
    await StaffDocument.updateMany(
      { 'documents._id': { $in: documentIds } },
      { $set: { 'documents.$.archived': true } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to clear documents:', error);
    return NextResponse.json(
      { error: 'Failed to clear documents' },
      { status: 500 }
    );
  }
} 