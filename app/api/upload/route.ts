import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/mongoose';
import { writeFile, access, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const employeeId = formData.get('employeeId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Create  directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await createDirIfNotExists(uploadDir);

    // Create unique filename
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the public URL
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

async function createDirIfNotExists(dir: string) {
  try {
    await access(dir);
  } catch {
    await mkdir(dir, { recursive: true });
  }
} 