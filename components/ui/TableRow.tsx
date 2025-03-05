// import Link from "next/link";
// import { FaEdit, FaEye, FaPhone, FaTrash } from "react-icons/fa";
// import { MdEmail, MdDescription, MdPerson, MdDelete } from "react-icons/md";
// import AlertModal, { alertButtonOnClickHandler } from "./AlertModal";
// import { usePathname } from "next/navigation";
// import { deleteEmployee } from "@/lib/actions/employee.actions";
// import { useState, useEffect } from "react";


// interface Props {
//   _id: string;
//   name: string;
//   jobTitle: string;
//   department: string;
//   salary: string;
//   index: number;
//   phone: string;
//   email: string;
//   documents?: string[];
// }

// const EmployeeDetailsModal = ({
//   id,
//   employee,
//   onstatusChange,
//   staffstatus,
//   onstatus2Change, // Added handler for status2
//   staffstatus2,    // Added initial value for status2
//   onstatus3Change, 
//   staffstatus3, 
//   onstatus4Change, 
//   staffstatus4, 
//   onstatus5Change, 
//   staffstatus5, 
//   onstatus6Change, 
//   staffstatus6,
//   onstatus7Change, 
//   staffstatus7,
//   onstatus8Change, 
//   staffstatus8,  
//   onstatus9Change, 
//   staffstatus9, 
//   onstatus10Change, 
//   staffstatus10,
//   onstatus11Change, 
//   staffstatus11,
//   onstatus12Change, 
//   staffstatus12,
//   onstatus13Change, 
//   staffstatus13,  

// }: {
//   id: string;
//   employee: Props;
//   onstatusChange: (status: string) => void;
//   staffstatus: string;
//   onstatus2Change: (status2: string) => void; // Added handler prop for status2
//   staffstatus2: string; // Added initial value for status2
//   onstatus3Change: (status3: string) => void; // Added handler prop for status3
//   staffstatus3: string; // Added initial value for status3
//   onstatus4Change: (status4: string) => void; // Added handler prop for status4
//   staffstatus4: string; // Added initial value for status4
//   onstatus5Change: (status5: string) => void; // Added handler prop for status5
//   staffstatus5: string; // Added initial value for status5
//   onstatus6Change: (status6: string) => void; // Added handler prop for status6
//   staffstatus6: string; // Added initial value for status6
//   onstatus7Change: (status7: string) => void; // Added handler prop for status7
//   staffstatus7: string; // Added initial value for status7
//   onstatus8Change: (status8: string) => void; // Added handler prop for status8
//   staffstatus8: string; // Added initial value for status8
//   onstatus9Change: (status9: string) => void; // Added handler prop for status9
//   staffstatus9: string; // Added initial value for status9
//   onstatus10Change: (status9: string) => void; // Added handler prop for status10
//   staffstatus10: string; // Added initial value for status10
//   onstatus11Change: (status11: string) => void; // Added handler prop for status11
//   staffstatus11: string; // Added initial value for status11
//   onstatus12Change: (status12: string) => void; // Added handler prop for status12
//   staffstatus12: string; // Added initial value for status12
//   onstatus13Change: (status13: string) => void; // Added handler prop for status13
//   staffstatus13: string; // Added initial value for status13
// }) => {
//   const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
//   const [status, setstatus] = useState(staffstatus);
//   const [status2, setstatus2] = useState(staffstatus2); // New state for status2
//   const [status3, setstatus3] = useState(staffstatus3); // New state for status3
//   const [status4, setstatus4] = useState(staffstatus4); // New state for status4
//   const [status5, setstatus5] = useState(staffstatus5); // New state for status5
//   const [status6, setstatus6] = useState(staffstatus6); // New state for status6
//   const [status7, setstatus7] = useState(staffstatus7); // New state for status7
//   const [status8, setstatus8] = useState(staffstatus8); // New state for status8
//   const [status9, setstatus9] = useState(staffstatus9); // New state for status9
//   const [status10, setstatus10] = useState(staffstatus10); // New state for status10
//   const [status11, setstatus11] = useState(staffstatus11); // New state for status11
//   const [status12, setstatus12] = useState(staffstatus12); // New state for status12
//   const [status13, setstatus13] = useState(staffstatus13); // New state for status13



//   const handlestatusChange = (newstatus: string) => {
//     setstatus(newstatus);
//     onstatusChange(newstatus);
//   };

//   const handlestatus2Change = (newstatus2: string) => {
//     setstatus2(newstatus2); // Update status2 state
//     onstatus2Change(newstatus2); // Trigger onstatus2Change callback
//   };

//   const handlestatus3Change = (newstatus3: string) => {
//     setstatus3(newstatus3); // Update status3 state
//     onstatus3Change(newstatus3); // Trigger onstatus3Change callback
//   };

//   const handlestatus4Change = (newstatus4: string) => {
//     setstatus4(newstatus4); // Update status4 state
//     onstatus4Change(newstatus4); // Trigger onstatus4Change callback
//   };

//   const handlestatus5Change = (newstatus5: string) => {
//     setstatus5(newstatus5); // Update status5 state
//     onstatus5Change(newstatus5); // Trigger onstatus5Change callback
//   };

//   const handlestatus6Change = (newstatus6: string) => {
//     setstatus6(newstatus6); // Update status6 state
//     onstatus6Change(newstatus6); // Trigger onstatus6Change callback
//   };

//   const handlestatus7Change = (newstatus7: string) => {
//     setstatus7(newstatus7); // Update status7 state
//     onstatus7Change(newstatus7); // Trigger onstatus7Change callback
//   };

//   const handlestatus8Change = (newstatus8: string) => {
//     setstatus8(newstatus8); // Update status4 state
//     onstatus8Change(newstatus8); // Trigger onstatus8Change callback
//   };

//   const handlestatus9Change = (newstatus9: string) => {
//     setstatus9(newstatus9); // Update status9 state
//     onstatus9Change(newstatus9); // Trigger onstatus9Change callback
//   };

//   const handlestatus10Change = (newstatus10: string) => {
//     setstatus10(newstatus10); // Update status10 state
//     onstatus10Change(newstatus10); // Trigger onstatus10Change callback
//   };

//   const handlestatus11Change = (newstatus11: string) => {
//     setstatus11(newstatus11); // Update status11 state
//     onstatus11Change(newstatus11); // Trigger onstatus11Change callback
//   };

//   const handlestatus12Change = (newstatus12: string) => {
//     setstatus12(newstatus12); // Update status12 state
//     onstatus12Change(newstatus12); // Trigger onstatus12Change callback
//   };

//   const handlestatus13Change = (newstatus13: string) => {
//     setstatus13(newstatus13); // Update status13 state
//     onstatus13Change(newstatus13); // Trigger onstatus13Change callback
//   };


//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await fetch(`/api/files?employeeId=${employee._id}`);
//         const data = await response.json();
//         setUploadedFiles(data.files || []);
//       } catch (error) {
//         console.error("Error fetching files:", error);
//       }
//     };

//     fetchFiles();
//   }, [employee._id]);

//   const openModalInNewTab = () => {
//     const modalContent = `
//      <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Royacare Staff Personal Profile</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         background-color: #e3e9f4;
//         margin: 0;
//         padding: 0;
//       }

//       .navbar {
//         width: 100%;
//         background-color: #021431;
//         color: white;
//         padding: 15px 0;
//         text-align: center;
//         font-size: 20px;
//         font-weight: bold;
//         position: fixed;
//         top: 0;
//         left: 0;
//         z-index: 10;
//       }

//       .footer {
//         width: 100%;
//         background-color: #ffffff;
//         color: black;
//         padding: 15px 0;
//         text-align: center;
//         font-size: 12px;
//         font-weight: bold;
//         position: fixed;
//         bottom: 0;
//         z-index: 10;
//         border-top: 1px solid #ddd;
//       }

//       table {
//         width: 100%;
//         border-collapse: collapse;
//         margin: 100px auto 40px; /* Space for fixed navbar and footer */
//         background-color: #ffffff;
//         border-radius: 8px;
//         box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//       }

//       table th,
//       table td {
//         padding: 15px;
//         text-align: center;
//         border: 1px solid #ddd;
//         font-size: 14px;
//       }

//       table th {
//         background-color: #021431;
//         color: white;
//         text-transform: uppercase;
//         font-weight: bold;
//         font-size: 12px;
//         white-space: nowrap;
//       }

//       table td {
//         color: #333;
//         vertical-align: middle;
//       }

//       table td:hover {
//         background-color: #f1f1f1;
//       }

//       h1 {
//         font-size: 24px;
//         color: #333;
//         margin-bottom: 20px;
//         text-align: center;
//       }

//       .upload-button {
//         display: inline-block;
//         background-color: #021431;
//         color: white;
//         text-align: center;
//         padding: 10px 20px;
//         border-radius: 5px;
//         text-decoration: none;
//         font-size: 16px;
//         font-weight: bold;
//         transition: background-color 0.3s ease;
//         margin-top: 10px;
//         margin-left: 20px;
//       }

//       .upload-button:hover {
//         background-color: #043a5f;
//       }

//       a {
//         color: #021431;
//         text-decoration: none;
//       }

//       a:hover {
//         text-decoration: underline;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="navbar">Royacare Staff Profile</div>

//     <div class="container">
//       <table>
//         <thead>
//           <tr>
//             <th><b>Full Name<b></th>
//             <th>Application Status</th>
//             <th>Name and E-mail/DATE of Reference 1 - PROFESSIONAL</th>
//             <th>Name and E-mail/DATE of Reference 2 - PROFESSIONAL OR CHARACTER
// </th>
//             <th>RTW Status</th>
//             <th>Curriculum Vitae</th>
//             <th>DBS/PVG/Police Report</th>
//             <th>National Insurance</th>
//             <th>Passport Data Page</th>
//             <th>Photo</th>
//             <th>Proof of Address</th>
//             <th>Share Code</th>
//             <th>Training & Language Proficiency</th>
//             <th>Location</th>
//             <th>Gender</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td style="text-transform: uppercase;">${employee.name}</td>
//             <td>${employee.department}</td>
//             <td>${status10}</td>
//             <td>${status11}</td>
//             <td>${status}</td>
//             <td>${status4}</td>
//             <td>${status2}</td>
//             <td>${status5}</td>
//             <td>${status3}</td>
//             <td>${status6}</td>
//             <td>${status7}</td>
//             <td>${status8}</td>
//             <td>${status9}</td>
//             <td>${status12}</td>
//             <td>${status13}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>

//     <div class="footer">
//       PLEASE SEND ALL DOCUMENTS TO
//       <a href="mailto:recruitment@royacare.co.uk">recruitment@royacare.co.uk</a>
//       or watch the
//       <a href="https://bit.ly/3oklaLp">Training Video</a>. <br />
//       <a href="https://www.jotform.com/tables/243565986507572?search=$%7BencodeURIComponent(" class="upload-button">Upload Remaining Documents</a>
//     </div>
//   </body>
// </html>


//     `;

//     const newWindow = window.open();
//     newWindow?.document.write(modalContent);
//     newWindow?.document.close();
//   };


//   // <tr>
//   //         <th>Job Title</th>
//   //         <td>${employee.jobTitle}</td>
//   //       </tr>

//    // <td>${employee.salary}</td><th>Profile Password</th>

//   // <tr>
//   //         <th>Phone</th>
//   //         <td>${employee.phone}</td>
//   //       </tr>

//   // <tr>
//   //         <th>Email</th>
//   //         <td>${employee.email}</td>
//   //       </tr>

//   return (
//     <dialog id={id} className="modal">
//       <div className="modal-box" style={{
//       width: '95vw', /* 95% of the viewport width */
//       maxWidth: '900px', /* Max width to prevent too wide */
//       height: '170vh', /* 90% of the viewport height */
//       background: 'white', /* Background color of the modal */
//       borderRadius: '8px', /* Optional: rounded corners */
//       boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', /* Shadow for the modal */
//       overflowY: 'auto', /* Scrollable content if it overflows */
//       padding: '1.5rem', /* Padding inside the modal */
//     }}>
//         <form method="dialog">
//           <button className="hover:bg-red-600 hover:text-white btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//             ✕
//           </button>
//         </form>
//         <div>
//         <div className="flex flex-col items-center justify-center text-center">
//         <div
//   style={{
//     width: '150px', // Increased size
//     height: '150px', // Increased size
//     borderRadius: '50%', // Makes it a circle
//     overflow: 'hidden', // Ensures the image doesn't spill out
//     backgroundColor: 'gray', // Fallback color
//     backgroundImage: `url('https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=')`,
//     backgroundSize: 'cover', // Ensures the image covers the entire area
//     backgroundPosition: 'center', // Centers the image
//     display: 'flex', // Centers any fallback content
//     alignItems: 'center', // Vertical centering
//     justifyContent: 'center', // Horizontal centering
//   }}
// >
//   {/* Fallback Text or Loader */}
//   &nbsp;
// </div>

//   <h3 className="text-lg font-black mt-2">{employee.name}</h3>
//   <p className="font-semibold">{employee.department}</p>
  
//   <div className="mt-4">
//     <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//       <button
//         className="btn btn-primary"
//         onClick={openModalInNewTab}
//       >
//         <MdPerson className="text-lg" />
//         View Personal Profile
//       </button>

//       <a
//   className="btn btn-primary"
//   href={`https://www.jotform.com/tables/243565986507572?search=${encodeURIComponent(
//     employee.name
//   )}`}
//   target="_blank"
//   rel="noopener noreferrer"
// >
// <MdDescription className="text-lg" />
//   View Documents
// </a>
// <a  href={`mailto:${employee.email}`} className="btn btn-primary">
//                 <MdEmail className="text-lg" />
//                 Email
//               </a>

// <a
//   className="btn btn-primary"
//   style={{
//     backgroundColor: 'red',
//     color: 'white',
//     padding: '10px 15px',
//     textDecoration: 'none',
//     borderRadius: '4px',
//     border: 'red',
//   }}
//   // href={`https://www.jotform.com/tables/243565986507572?search=${encodeURIComponent(
//   //   employee.name
//   // )}`}
//   target="_blank"
//   rel="noopener noreferrer"
// >
// <MdDelete className="text-lg" />
//   Delete Staff
// </a>


//     </div>
//   </div>
// </div>

          
//           <div className="mt-4">
            
//           <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "4px" }}>
  

 
// </div>

// <div className="flex flex-col gap-3">
// <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>REFERENCES ( PROFESSIONAL OR CHARACTER) </p>


// <input
//   type="text"
//   name="status10"
//   value={status10}
//   onChange={(e) => handlestatus10Change(e.target.value)}
//   placeholder="Referee 1"
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     fontSize: '14px',
//   }}
// />

// <input
//   type="text"
//   name="status11"
//   value={status11}
//   onChange={(e) => handlestatus11Change(e.target.value)}
//   placeholder="Referee 2"
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     fontSize: '14px',
//   }}
// />


// </div>





           

//             <div className="divider"></div>
//             <div className="flex flex-col gap-3">
//   <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>RIGHT TO WORK</p>
//   <select
//   name="status"
//   value={status}
//   onChange={(e) => handlestatusChange(e.target.value)}
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     appearance: 'none', // Hides default dropdown arrow
//     backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23000\'><path d=\'M3 4l3 3 3-3z\'/></svg>")',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 10px center',
//     backgroundSize: '12px',
//     fontSize: '14px',
//   }}
// >
// <option value="">Select an option</option>
//   <option value="Skilled">Skilled</option>
//   <option value="Student">Student</option>
//   <option value="RGN">RGN</option>
//   <option value="Dependant">Dependant</option>
//   <option value="ILR">ILR</option>
//   <option value="EU Settlement">EU Settlement</option>
//   <option value="Graduate">Graduate</option>
//   <option value="British">British</option>
//   <option value="Irish">Irish</option>
//   <option value="Work Permitted">Work Permitted</option>
//   <option value="Asylum">Asylum</option>
//   <option value="Awaiting COS & Employment Letter">Awaiting COS & Employment Letter</option>
//   <option value="Awaiting COS">Awaiting COS</option>
//   <option value="Awaiting Employment Letter">Awaiting Employment Letter</option>
//   <option value="Awaiting School Status Letter & Timetable">Awaiting School Status Letter & Timetable</option>
//   <option value="Awaiting Statement of Entry">Awaiting Statement of Entry</option>
//   <option value="Awaiting School Timetable">Awaiting School Timetable</option>
//   <option value="Awaiting Immunization">Awaiting Immunization</option>
// </select>


 
// </div>

// <div className="divider"></div>
//             <div className="flex flex-col gap-3">
//   <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>CV</p>

//   <select
//   name="curriculumVitae"
//   value={status4}
//   onChange={(e) => handlestatus4Change(e.target.value)}
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     appearance: 'none', // Hides default dropdown arrow
//     backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23000\'><path d=\'M3 4l3 3 3-3z\'/></svg>")',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 10px center',
//     backgroundSize: '12px',
//     fontSize: '14px',
//   }}
// >
// <option value="">Select an option</option>
//   <option value="COMPLIANT">COMPLIANT</option>
//   <option value="NO">NO</option>
//   <option value="UPDATE REQUIRED">UPDATE REQUIRED</option>
//   <option value="GAP ON CV">GAP ON CV</option>
//   <option value="DO NOT MEET CRITERIA">DO NOT MEET CRITERIA</option>
// </select>
// </div>

// <style jsx>{`
//   /* CSS for grid layout */
//   .grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//     gap: 1rem;
//   }

//   label {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     font-size: 14px;
//   }
// `}</style>

          
// <div className="divider"></div>
//             <div className="flex flex-col gap-3">
//   <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>DBS, PVG, ACCESSNI 

// WORKFORCE ?
// </p>
//   <select
//   name="status2"
//   value={status2}
//   onChange={(e) => handlestatus2Change(e.target.value)}
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     appearance: 'none', // Hides default dropdown arrow
//     backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23000\'><path d=\'M3 4l3 3 3-3z\'/></svg>")',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 10px center',
//     backgroundSize: '12px',
//     fontSize: '14px',
//   }}
// >
// <option value="">Select an option</option>
//   <option value="Awaiting PVG">Awaiting PVG</option>
//   <option value="Awaiting AccessNI">Awaiting AccessNI</option>
//   <option value="Awaiting DBS on Update Service">Awaiting DBS on Update Service</option>
//   <option value="Police Report">Police Report</option>
//   <option value="Applied">Applied</option>
//   <option value="PVG">PVG</option>
//   <option value="AccessNI">AccessNI</option>
//   <option value="Need Clearer Copy">Need Clearer Copy</option>
//   <option value="Awaiting Royacare DBS">Awaiting Royacare DBS</option>
//   <option value="Awaiting DBS Back Page">Awaiting DBS Back Page</option>
//   <option value="Adult Only">Adult Only</option>
//   <option value="Child & Adult">Child & Adult</option>
//   <option value="DBS">DBS</option>
//   <option value="Police">Police</option>
// </select>

// </div>

// <div className="divider"></div>

//             <div className="flex flex-col gap-3">
//   <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>NATIONAL INSURANCE</p>
//   <select
//   name="status5"
//   value={status5}
//   onChange={(e) => handlestatus5Change(e.target.value)}
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     appearance: 'none', // Hides default dropdown arrow
//     backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23000\'><path d=\'M3 4l3 3 3-3z\'/></svg>")',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 10px center',
//     backgroundSize: '12px',
//     fontSize: '14px',
//   }}
// >
//   <option value="Yes">Yes</option>
//   <option value="No">No</option>
//   <option value="Need Clearer Copy">Need Clearer Copy</option>
// </select>
//   </div>



// <div className="divider"></div>

//             <div className="flex flex-col gap-3">
//   <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>PASSPORT DATA PAGE</p>
//   <select
//   name="status3"
//   value={status3}
//   onChange={(e) => handlestatus3Change(e.target.value)}
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     appearance: 'none', // Hides default dropdown arrow
//     backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23000\'><path d=\'M3 4l3 3 3-3z\'/></svg>")',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 10px center',
//     backgroundSize: '12px',
//     fontSize: '14px',
//   }}
// >
//   <option value="Yes">Yes</option>
//   <option value="No">No</option>
//   <option value="Need Clearer Copy">Need Clearer Copy</option>
//   <option value="Expired">Expired</option>
// </select>
  

  

  


//   <div className="divider"></div>

//             <div className="flex flex-col gap-3">
//   <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>PHOTO</p>
//   <select
//   name="status6"
//   value={status6}
//   onChange={(e) => handlestatus6Change(e.target.value)}
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     appearance: 'none', // Hides default dropdown arrow
//     backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23000\'><path d=\'M3 4l3 3 3-3z\'/></svg>")',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 10px center',
//     backgroundSize: '12px',
//     fontSize: '14px',
//   }}
// >
//   <option value="Yes">Yes</option>
//   <option value="No">No</option>
//   <option value="Need Clearer Copy">Need Clearer Copy</option>
// </select>
//   </div>



//   <div className="divider"></div>

//             <div className="flex flex-col gap-3">
//   <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>2(TWO) UK Proof of Address & ONE BANK STATEMENT FROM ABROAD IF LIVED IN UK FOR LESS THAN 5 YEARS</p>
//   <select
//   name="status7"
//   value={status7}
//   onChange={(e) => handlestatus7Change(e.target.value)}
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     appearance: 'none', // Hides default dropdown arrow
//     backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23000\'><path d=\'M3 4l3 3 3-3z\'/></svg>")',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 10px center',
//     backgroundSize: '12px',
//     fontSize: '14px',
//   }}
// >
//   <option value="">Select an option</option>
//   <option value="UK Bank">UK Bank</option>
//   <option value="2nd UK">2nd UK</option>
//   <option value="Both UK">Both UK</option>
//   <option value="Abroad Bank">Abroad Bank</option>
//   <option value="Abroad">Abroad</option>
//   <option value="UK Bank Only">UK Bank Only</option>
//   <option value="Second UK">Second UK</option>
// </select>


//   </div>


//   <div className="divider"></div>

//             <div className="flex flex-col gap-3">
//   <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>SHARE CODE, BRITISH OR IRISH </p>
//   <select
//   name="status8"
//   value={status8}
//   onChange={(e) => handlestatus8Change(e.target.value)}
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     appearance: 'none', // Hides default dropdown arrow
//     backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23000\'><path d=\'M3 4l3 3 3-3z\'/></svg>")',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 10px center',
//     backgroundSize: '12px',
//     fontSize: '14px',
//   }}
// >
// <option value="">Select an option</option>
//   <option value="Yes">Yes</option>
//   <option value="No">No</option>
//   <option value="Awaiting Share Code">Awaiting Share Code</option>
//   <option value="Irish">Irish</option>
//   <option value="British">British</option>
//   <option value="ECS Student">ECS Student</option>
//   <option value="Awaiting ECS">Awaiting ECS</option>
//   <option value="EU Passport">EU Passport</option>
//   <option value="ECS Skilled">ECS Skilled</option>
//   <option value="ECS None">ECS None</option>
//   <option value="ECS Asylum">ECS Asylum</option>
//   <option value="ARC">ARC</option>
// </select>

//   </div>




//   <div className="divider"></div>

// <div className="flex flex-col gap-3">
// <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>Training With Agency & Language Proficiency  </p>

// <select
// name="status9"
// value={status9}
// onChange={(e) => handlestatus9Change(e.target.value)}
// style={{
// padding: '8px 12px',
// border: '3px solid black',
// appearance: 'none', // Hides default dropdown arrow
// backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23000\'><path d=\'M3 4l3 3 3-3z\'/></svg>")',
// backgroundRepeat: 'no-repeat',
// backgroundPosition: 'right 10px center',
// backgroundSize: '12px',
// fontSize: '14px',
// }}
// >
// <option value="">Select an option</option>
// <option value="Training">Training</option>
// <option value="Enrolled">Enrolled</option>
// <option value="Not Complete">Not Complete</option>
// <option value="Proficiency">Proficiency</option>
// <option value="Language">Language</option>
// <option value="Training Done">Training Done</option>

// </select>

// </div>

// <div className="divider"></div>

// <div className="flex flex-col gap-3">
// <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>Location  </p>

// <input
//   type="text"
//   name="status12"
//   value={status12}
//   onChange={(e) => handlestatus12Change(e.target.value)}
//   placeholder=""
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     fontSize: '14px',
//   }}
// />

// </div>

// <div className="divider"></div>

// <div className="flex flex-col gap-3">
// <p style={{ textAlign: 'center', color: '#021431', fontWeight: 'bold' }}>Gender  </p>
// <input
//   type="text"
//   name="status13"
//   value={status13}
//   onChange={(e) => handlestatus13Change(e.target.value)}
//   placeholder=""
//   style={{
//     padding: '8px 12px',
//     border: '3px solid black',
//     fontSize: '14px',
//   }}
// />
// </div>


// </div>
























//             <div className="divider"></div>
//             <div className="flex justify-between">
//               <a href={`mailto:${employee.email}`} className="btn btn-ghost">
//                 <MdEmail className="text-lg" />
//                 {employee.email}
//               </a>
//               <a href={`tel:${employee.phone}`} className="btn btn-ghost">
//                 <FaPhone className="text-lg" />
//                 {employee.phone}
//               </a>
//             </div>

//             <div
//   style={{
//     background: "#E3E9F4",
//     width: "150px", // Set the width
//     height: "150px", // Set the height (same as width for a square)
//     display: "flex", // Center content
//     flexDirection: "column", // Stack content vertically
//     justifyContent: "center", // Center vertically
//     alignItems: "center", // Center horizontally
//     borderRadius: "8px", // Optional: Add rounded corners
//   }}
// >
//   {/* <p className="text-sm opacity-70">Application Status</p>
//   <p className="font-semibold">{employee.department}</p> */}
// </div>

          

            
//           </div>
//         </div>
//       </div>
//     </dialog>
//   );
// };

// const showEmployeeModal = (id: string) => {
//   const modal = document.getElementById(id) as HTMLDialogElement;
//   if (modal) modal.showModal();
// };

// const deleteEmployeeHandler = async (id: string, pathname: string | null) => {
//   if (!pathname) return;
//   await deleteEmployee(id, pathname);
// };

// const TableRow = ({
//   _id,
//   name,
//   jobTitle,
//   department,
//   salary,
//   index,
//   phone,
//   email,
//   documents,
// }: Props) => {
//   const pathname = usePathname();
//   const [staffstatus, setStaffstatus] = useState("Student");
//   const [staffstatus2, setStaffstatus2] = useState("");
//   const [staffstatus3, setStaffstatus3] = useState("");
//   const [staffstatus4, setStaffstatus4] = useState("");
//   const [staffstatus5, setStaffstatus5] = useState("");
//   const [staffstatus6, setStaffstatus6] = useState("");
//   const [staffstatus7, setStaffstatus7] = useState("");
//   const [staffstatus8, setStaffstatus8] = useState("");
//   const [staffstatus9, setStaffstatus9] = useState("");
//   const [staffstatus10, setStaffstatus10] = useState("");
//   const [staffstatus11, setStaffstatus11] = useState("");
//   const [staffstatus12, setStaffstatus12] = useState("");
//   const [staffstatus13, setStaffstatus13] = useState("");

//   const handleDoubleClick = () => {
//     const subject = encodeURIComponent(`Royacare Agency - New Message For ${name}`);
//     const body = encodeURIComponent(
//       `Hello ${name},\n\n  ${department} .\n\n` +
//       `To Upload An Updated Document Kindly Do This \n\n1.SEARCH YOUR EMAIL FOR " Royacare Agency New Applicants " \n2.OPEN UP THE EMAIL AND CLICK ON EDIT RESPONSE\n\nRoyacare Agency Ltd\n247 Fore Street, Edmonton, London N18 2TY\n` +
//       `Email: joshua@royacare.co.uk\nWebsite: www.royacare.co.uk\nTel: 020 39629937\n` +
//       `Mob: 07451 245665\nMob: 07520 608878 (Royacare 247 Oncall Number)\n\n` +
//       `======================================\n\n` +
//       `The information included in this email is of a confidential nature and is only intended for the addressee. If you are not the intended addressee, any disclosure, copying or distribution by you is prohibited and may be unlawful. Disclosure to any party other than the addressee, whether inadvertent or otherwise, is not intended to waive privilege or confidentiality. Although this e-mail and any attachments are believed to be free from any virus, or other defect which might affect any system into which they are opened or received, it is the responsibility of the recipient to check that they are virus free and that they will in no way affect its systems and data. Royacare Agency Ltd accepts no responsibility for any loss or damage arising in any way from their receipt, opening or use.\n\n` +
//       `Royacare Agency Ltd, Registered Office: 80 John Davis Way, Watlington, Kings Lynn, Norfolk PE33 0TD. Registered in England and Wales No. 06504122\n\n` +
//       `Please consider the environment before printing this email.`
//     );
//     const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
//     window.location.href = mailtoUrl;
//   };

//   const handleSendUploadLink = async () => {
//     const subject = encodeURIComponent(`Document Upload Link - Royacare Agency`);
//     const uploadLink = `https://your-domain.com/upload/${_id}`; // Replace with your actual upload URL
//     const body = encodeURIComponent(
//       `Hello ${name},\n\n` +
//       `Please use the following link to upload your documents:\n${uploadLink}\n\n` +
//       `Best regards,\nRoyacare Agency Team`
//     );
//     try {
//       // Send email with upload link using the mailto protocol
//       const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
//       window.location.href = mailtoUrl;
//       // Show success message
//       alert("Upload link sent successfully!");
//     } catch (error) {
//       console.error("Error sending upload link:", error);
//       alert("Failed to send upload link. Please try again.");
//     }
//   };

//   return (
//     <tr className="hover">
//       <th className="max-sm:hidden">{index + 1}</th>
//       <td>{name}</td>
//       <td>
       
//       </td>
//       <td className="flex max-sm:flex-col">
//         {/* <span className="relative inline-block bg-blue-100 p-4 text-center">
//           {staffstatus}
//         </span> */}

// <div
//           className="relative inline-block bg-blue-100 p-4 text-center cursor-pointer"
//           onDoubleClick={handleDoubleClick}
//         >
//           <span className="block">{department}</span>
//         </div>
//         <button
//           className="btn btn-ghost"
//           onClick={() => showEmployeeModal(_id)}
//         >
//           <FaEye className="text-xl" />
//           <span className="hidden lg:block">View on Tracker</span>
//         </button>
//         <button
//           className="btn btn-ghost"
//           onClick={handleSendUploadLink}
//         >
//           <MdDescription className="text-xl" />
//           <span className="hidden lg:block">Share Application Form</span>
//         </button>
//         <Link href={`/edit/${_id}`} className="btn btn-ghost">
//           <FaEdit className="text-xl" />
//           <span className="hidden lg:block">Update</span>
//         </Link>
//         <button
//           className="btn btn-ghost"
//           onClick={() => alertButtonOnClickHandler(_id + "delete")}
//         >
//           <FaTrash className="text-xl text-error" />
//           <span className="hidden lg:block">Delete</span>
//         </button>
//         <EmployeeDetailsModal
//           id={_id}
//           employee={{
//             name,
//             jobTitle,
//             department,
//             salary,
//             phone,
//             email,
//             index,
//             _id,
//             documents,
//           }}
//           onstatusChange={setStaffstatus}
//           staffstatus={staffstatus}
//           onstatus2Change={setStaffstatus2}
//           staffstatus2={staffstatus2}
//           onstatus3Change={setStaffstatus3}
//           staffstatus3={staffstatus3}
//           onstatus4Change={setStaffstatus4}
//           staffstatus4={staffstatus4}
//           onstatus5Change={setStaffstatus5}
//           staffstatus5={staffstatus5}
//           onstatus6Change={setStaffstatus6}
//           staffstatus6={staffstatus6}
//           onstatus7Change={setStaffstatus7}
//           staffstatus7={staffstatus7}
//           onstatus8Change={setStaffstatus8}
//           staffstatus8={staffstatus8}
//           onstatus9Change={setStaffstatus9}
//           staffstatus9={staffstatus9}
//           onstatus10Change={setStaffstatus10}
//           staffstatus10={staffstatus10}
//           onstatus11Change={setStaffstatus11}
//           staffstatus11={staffstatus11}
//           onstatus12Change={setStaffstatus12}
//           staffstatus12={staffstatus12}
//           onstatus13Change={setStaffstatus13}
//           staffstatus13={staffstatus13}
//         />
//         <AlertModal
//           id={_id + "delete"}
//           buttonTitle="Delete"
//           body="Are you sure about this decision?"
//           successHandler={() => deleteEmployeeHandler(_id, pathname)}
//         />
//       </td>
//     </tr>
//   );
// };







// export default TableRow;
