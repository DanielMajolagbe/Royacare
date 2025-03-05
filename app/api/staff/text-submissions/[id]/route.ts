import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const id = params.id;

    const submission = await db.collection('textSubmissions').findOne({
      _id: new ObjectId(id)
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error fetching text submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const id = params.id;
    const updates = await request.json();

    const result = await db.collection('textSubmissions').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating text submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const id = params.id;

    const result = await db.collection('textSubmissions').deleteOne({
      _id: new ObjectId(id)
    });

    if (!result.deletedCount) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting text submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
} 