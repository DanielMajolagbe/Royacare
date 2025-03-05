import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const staffId = searchParams.get('staffId');
    
    if (!staffId) {
      return NextResponse.json(
        { error: 'Staff ID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const staffProgress = await db.collection('staffProgress').findOne({ staffId });
    
    return NextResponse.json({
      exists: !!staffProgress,
      currentStage: staffProgress?.currentStage || 1,
      companies: staffProgress?.companies || []
    });
  } catch (error) {
    console.error('Error in GET staff progress:', error);
    return NextResponse.json(
      { error: 'Database operation failed', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { staffId, currentStage } = await request.json();
    
    if (!staffId) {
      return NextResponse.json(
        { error: 'Staff ID is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const existingProgress = await db.collection('staffProgress')
      .findOne({ staffId });

    if (existingProgress) {
      return NextResponse.json({ 
        exists: true, 
        currentStage: existingProgress.currentStage 
      });
    }

    await db.collection('staffProgress').insertOne({
      staffId,
      currentStage: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ success: true, currentStage: 1 });
  } catch (error) {
    console.error('Error in POST staff progress:', error);
    return NextResponse.json(
      { error: 'Database operation failed', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { staffId, currentStage } = await request.json();
    
    if (!staffId || typeof currentStage !== 'number') {
      return NextResponse.json(
        { error: 'Staff ID and current stage are required' }, 
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const result = await db.collection('staffProgress').updateOne(
      { staffId },
      {
        $set: {
          currentStage,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ 
      success: true, 
      currentStage,
      modified: result.modifiedCount > 0
    });
  } catch (error) {
    console.error('Error in PUT staff progress:', error);
    return NextResponse.json(
      { error: 'Database operation failed', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
} 