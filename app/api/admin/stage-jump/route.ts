import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { staffId, targetStage } = await req.json();
    const { db } = await connectToDatabase();

    // Update staff progress
    await db.collection('staffProgress').updateOne(
      { staffId },
      {
        $set: {
          currentStage: targetStage,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    // Log the stage jump for record keeping
    await db.collection('stageJumpHistory').insertOne({
      staffId,
      targetStage,
      timestamp: new Date(),
      adminId: 'admin', // You can add actual admin ID if available
    });

    return NextResponse.json({ 
      success: true, 
      message: `Successfully updated stage for staff ${staffId} to stage ${targetStage}` 
    });
  } catch (error) {
    console.error('Error in stage jump:', error);
    return NextResponse.json(
      { error: 'Failed to update stage' },
      { status: 500 }
    );
  }
} 