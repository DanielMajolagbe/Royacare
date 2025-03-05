import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { z } from 'zod';

const ActivityLogSchema = z.object({
  adminUser: z.string(),
  action: z.string(),
  details: z.any()
});

// Skip actual database operations during build time
const isBuildTime = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production';

export async function POST(request: Request) {
  try {
    // During build time, return a mock response
    if (isBuildTime) {
      return NextResponse.json({ success: true });
    }

    const body = await request.json();
    const validatedData = ActivityLogSchema.parse(body);
    
    const { db } = await connectToDatabase();
    if (!db) {
      console.error('Database connection failed: db object is null');
      throw new Error('Database connection failed');
    }

    const result = await db.collection('activityLogs').insertOne({
      ...validatedData,
      timestamp: new Date()
    });

    if (!result.acknowledged) {
      throw new Error('Failed to insert activity log');
    }

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Activity log error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to log activity';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // During build time, return mock data
    if (isBuildTime) {
      return NextResponse.json([]);
    }

    const { db } = await connectToDatabase();
    if (!db) {
      console.error('Database connection failed: db object is null');
      throw new Error('Database connection failed');
    }

    const logs = await db.collection('activityLogs')
      .find({})
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Fetch logs error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch logs';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 