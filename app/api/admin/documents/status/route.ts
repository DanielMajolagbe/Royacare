import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

type ValidStage = 1 | 2 | 3 | 4 | 5 | 6;

async function checkAndUpdateStage(db: any, staffId: string, stage: ValidStage) {
  try {
    const documents = await db.collection('documents')
      .find({ staffId, stage, status: 'approved' })
      .toArray();

    // Define required documents for each stage
    const requiredDocs: { [K in ValidStage]: number } = {
      1: 3, // CV, Passport Data, Passport Photo
      2: 5, // References
      3: 1, // Right to Work
      4: 4, // NI and Address proofs
      5: 1, // DBS/PVG
      6: 2  // Training and English
    };

    // For stage 1, we need exactly 3 approved documents
    if (stage === 1) {
      const shouldProgress = documents.length === requiredDocs[stage];
      
      if (shouldProgress) {
        await db.collection('staffProgress').updateOne(
          { staffId },
          {
            $set: {
              currentStage: stage + 1,
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );
      }
      
      return shouldProgress;
    }

    // For other stages, we need at least the required number of documents
    if (documents.length >= requiredDocs[stage]) {
      await db.collection('staffProgress').updateOne(
        { staffId },
        {
          $set: {
            currentStage: stage + 1,
            updatedAt: new Date()
          }
        },
        { upsert: true }
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error in checkAndUpdateStage:', error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { documentId, staffId, status, stage, note } = await req.json();

    // Update document status
    const result = await db.collection('documents').updateOne(
      { _id: new ObjectId(documentId) },
      {
        $set: {
          status,
          notes: note,
          updatedAt: new Date()
        }
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Check if stage should be updated
    const stageUpdated = await checkAndUpdateStage(db, staffId, stage);

    return NextResponse.json({ 
      success: true,
      stageUpdated,
      newStage: stageUpdated ? stage + 1 : stage
    });
  } catch (error) {
    console.error('Error updating document status:', error);
    return NextResponse.json(
      { error: 'Failed to update document status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 