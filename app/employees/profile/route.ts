import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongoose";
import Employee from "@/lib/models/employee.model";

export async function POST(req: Request) {
  try {
    console.log("Connecting to DB...");
    await connectToDB();

    const { salary } = await req.json();
    console.log("Received salary:", salary);

    if (!salary) {
      return NextResponse.json({ error: "Salary is required." }, { status: 400 });
    }

    // Ensure proper salary type matching
    const employee = await Employee.findOne({ salary: salary.toString() });
    console.log("Employee found:", employee);

    if (!employee) {
      return NextResponse.json({ error: "Employee not found." }, { status: 404 });
    }

    return NextResponse.json({ employee });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
