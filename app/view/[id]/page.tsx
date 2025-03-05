"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchEmployee } from "@/lib/actions/employee.actions";

interface Employee {
  _id: string;
  name: string;
  email: string;
  // Add other employee fields as needed
}

export default function ViewEmployee() {
  const params = useParams();
  const id = params?.id as string;
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const data = await fetchEmployee(id);
      setEmployee(data);
    };
    if (id) {
      fetchEmployeeData();
    }
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h1>{employee.name}</h1>
      <p>{employee.email}</p>
      {/* Add other employee details */}
    </div>
  );
}
