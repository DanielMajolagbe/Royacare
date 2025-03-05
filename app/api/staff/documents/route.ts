import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { sendDocumentUploadNotification } from '@/lib/utils/emailNotifier';
import { DocumentType } from '@/lib/types/document.types';
import path from 'path';
import fs from 'fs';

type ValidStage = 1 | 2 | 3 | 4 | 5 | 6;

async function getDocuments(db: any, staffId: string) {
  try {
    const documents = await db.collection('documents')
      .find({ staffId })
      .sort({ uploadedAt: -1 })
      .toArray();
    return documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

async function checkAndUpdateStage(db: any, staffId: string, stage: ValidStage) {
  try {
    const documents = await db.collection('documents')
      .find({ staffId, stage, status: 'approved' })
      .toArray();

    const requiredDocs: Record<ValidStage, number> = {
      1: 3, // CV, Passport Data, Passport Photo
      2: 5, // References
      3: 1, // Right to Work
      4: 4, // NI and Address proofs
      5: 1, // DBS/PVG
      6: 2  // Training and English
    };

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
    console.error('Error checking/updating stage:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const staffId = formData.get('staffId') as string;
    const parsedStage = parseInt(formData.get('stage') as string);
    const documentType = formData.get('documentType') as DocumentType;
    const name = file.name;

    if (!file || !staffId || !documentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate stage
    if (![1, 2, 3, 4, 5, 6].includes(parsedStage)) {
      return NextResponse.json(
        { error: 'Invalid stage number' },
        { status: 400 }
      );
    }
    
    const stage = parsedStage as ValidStage;

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${staffId}-${documentType}-${timestamp}${path.extname(name)}`;
    const filepath = path.join(uploadsDir, filename);
    
    // Convert File to Buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filepath, buffer);

    // Generate public URL
    const fileUrl = `/uploads/${filename}`;

    // Send email notification
    const emailSent = await sendDocumentUploadNotification(documentType, staffId);
    
    // Save document to database
    const result = await db.collection('documents').insertOne({
      staffId,
      name,
      type: documentType,
      url: fileUrl,
      uploadedAt: new Date(),
      stage,
      status: 'pending',
      createdAt: new Date()
    });

    if (!result.insertedId) {
      throw new Error('Failed to save document to database');
    }

    // Check if stage should be updated
    await checkAndUpdateStage(db, staffId, stage);

    return NextResponse.json({ 
      success: true,
      url: fileUrl,
      emailSent,
      documentId: result.insertedId,
      message: `File uploaded successfully${emailSent ? ' and notification sent' : ''}`
    });
    
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const staffId = searchParams.get('staffId');

    if (!staffId) {
      return NextResponse.json({ error: 'Staff ID required' }, { status: 400 });
    }

    const documents = await getDocuments(db, staffId);
    
    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
} 