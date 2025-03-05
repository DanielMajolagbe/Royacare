import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { staffId, currentStage } = await req.json();

    if (!staffId || currentStage === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add your stage advancement logic here
    const newStage = currentStage + 1;

    return NextResponse.json({
      success: true,
      newStage,
      message: 'Stage advanced successfully'
    });

  } catch (error) {
    console.error('Stage advancement error:', error);
    return NextResponse.json(
      { error: 'Failed to advance stage' },
      { status: 500 }
    );
  }
} 