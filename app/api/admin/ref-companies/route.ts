import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface StaffDocument {
  _id: ObjectId;
  staffId: string;
  stage: number;
  companies?: string[];
  documentCount: number;
}

export async function GET(req: Request) {
  try {
    const { db } = await connectToDatabase();

    // Get all staff with stage 1 and their document status
    const staff = await db.collection('staffProgress')
      .aggregate([
        {
          $match: {
            $or: [
              { currentStage: 1 },
              { currentStage: 2, companies: { $exists: false } }
            ]
          }
        },
        {
          $lookup: {
            from: 'documents',
            let: { staffId: '$staffId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$staffId', '$$staffId'] },
                      { $eq: ['$stage', 1] },
                      { $eq: ['$status', 'approved'] }
                    ]
                  }
                }
              }
            ],
            as: 'documents'
          }
        },
        {
          $project: {
            _id: 1,
            staffId: 1,
            stage: '$currentStage',
            companies: 1,
            documentsApproved: {
              $eq: [{ $size: '$documents' }, 3] // Must be exactly 3 approved documents
            },
            documentCount: { $size: '$documents' } // Add document count for verification
          }
        }
      ]).toArray();

    // Additional check to ensure staff with more than 3 documents stay in stage 1
    const verifiedStaff = staff.map((s: StaffDocument) => ({
      ...s,
      documentsApproved: s.documentCount === 3 // Only true if exactly 3 documents
    }));

    return NextResponse.json({ staff: verifiedStaff });
  } catch (error) {
    console.error('Error in GET ref-companies:', error);
    return NextResponse.json(
      { error: 'Database operation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { staffId, companies } = await req.json();
    const { db } = await connectToDatabase();

    const result = await db.collection('staffProgress').updateOne(
      { staffId },
      {
        $set: {
          companies,
          currentStage: 2, // Set to stage 2 when companies are assigned
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    if (!result.acknowledged) {
      throw new Error('Failed to update staff progress');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST ref-companies:', error);
    return NextResponse.json(
      { error: 'Failed to save companies', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 