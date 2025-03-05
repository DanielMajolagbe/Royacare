import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Add your stage completion logic here
    
    return NextResponse.json({ message: "Stage completed successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to complete stage" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
} 