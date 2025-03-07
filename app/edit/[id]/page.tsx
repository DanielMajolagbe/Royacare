
import { fetchEmployee } from "@/lib/actions/employee.actions";

const Page = async ({ params }: { params: { id: string } }) => {
  const employeeData = await fetchEmployee(params.id);
  const employeeInfo = {
    id: employeeData._id.toString(),
    name: employeeData.name,
    email: employeeData.email,
    phone: employeeData.phone,
    jobTitle: employeeData.jobTitle,
    department: employeeData.department,
    salary: employeeData.salary,
  };

  return (
    <section>
      <h1 className="text-head">Update Staff Information</h1>
    </section>
  );
};

export default Page;
