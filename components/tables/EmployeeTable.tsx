// import { useState, useEffect } from "react";
// import { fetchEmployees, fetchFilteredEmployees } from "@/lib/actions/employee.actions";
// import TableRow from "../ui/TableRow";

// const EmployeeTable = ({
//   query,
//   sort,
// }: {
//   query: string;
//   sort: boolean;
// }) => {
//   const [employeesData, setEmployeesData] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchFilteredEmployees(query, sort);
//         setEmployeesData(data);
//       } catch (error) {
//         setError("Error fetching employee data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [query, sort]); // Fetch data whenever `query` or `sort` changes

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="overflow-x-auto w-full">
//      <table className="table w-full min-md:table-lg">

//         <thead>
//           <tr>
//             <th className="max-sm:hidden"></th>
//             <th>Name</th>
//             <th style={{color: 'white'}}>Note Attached</th>
//             <th>Application Status</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {employeesData.map((employee, index) => (
//             <TableRow
//               key={employee._id.toString()}
//               _id={employee._id.toString()}
//               name={employee.name}
//               jobTitle={employee.jobTitle}
//               department={employee.department}
//               salary={employee.salary}
//               phone={employee.phone}
//               email={employee.email}
//               index={index}
//               documents={employee.documents}
//             />
//           ))}
//         </tbody>
//       </table>
//       {employeesData.length < 1 && (
//         <h1 className="text-center text-2xl text-slate-500/70 font-bold mt-10">
//           {query ? "No search result!" : "No employees yet!"}
//         </h1>
//       )}
//     </div>
//   );
// };

// export default EmployeeTable;
