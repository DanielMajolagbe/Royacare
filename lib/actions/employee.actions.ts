"use server";

import mongoose from "mongoose";
import Employee from "../models/employee.model";
import connectToDB from "../mongoose";
import { revalidatePath } from "next/cache";


interface Props {
  id?: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  salary: string;
  documents?: string[];
}

// function to create or update the employee
export async function updateEmployee({
  id,
  name,
  email,
  phone,
  jobTitle,
  department,
  salary,
  documents,
}: Props) {
  try {
    await connectToDB();

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        jobTitle,
        department,
        salary,
        documents,
      },
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedEmployee));
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
}

// function to fetch all employeees
export async function fetchEmployees() {
  try {
    await connectToDB();

    const employees = await Employee.find({})
      .select('_id name email phone jobTitle department salary documents')
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(employees));
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
}

// function to search Employees by search query
export async function fetchFilteredEmployees(
  searchQuery: string,
  sort: boolean
) {
  try {
    await connectToDB();

    const queryObject = searchQuery
      ? {
          $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
            { phone: { $regex: searchQuery, $options: "i" } },
            { jobTitle: { $regex: searchQuery, $options: "i" } },
            { department: { $regex: searchQuery, $options: "i" } },
            { salary: { $regex: searchQuery, $options: "i" } },
          ],
        }
      : {};

    const employees = await Employee.find(queryObject)
      .select('_id name email phone jobTitle department salary documents')
      .sort({ name: sort ? 1 : -1 });

    return JSON.parse(JSON.stringify(employees));
  } catch (error) {
    console.error("Error fetching filtered employees:", error);
    throw error;
  }
}

// function to fetch employee by id
export async function fetchEmployee(id: string) {
  try {
    connectToDB();

    const employeeObjectId = new mongoose.Types.ObjectId(id);
    const employee = await Employee.findById(employeeObjectId);

    return employee;
  } catch (error: any) {
    throw new Error(`Error fetching employee: ${error.message}`);
  }
}

// function to remove employee
export async function deleteEmployee(id: string, pathname: string) {
  try {
    connectToDB();

    const objectId = new mongoose.Types.ObjectId(id);

    await Employee.deleteOne({ _id: objectId });

    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(`Error deleting Employee: ${error.message}`);
  }
}
