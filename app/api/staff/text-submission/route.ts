import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
} 