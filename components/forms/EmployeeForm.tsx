// "use client";

// import {
//   employeeValidation,
//   employeeValidationType,
// } from "@/lib/validations/employee.validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import TextInput from "../ui/TextInput";
// import { updateEmployee } from "@/lib/actions/employee.actions";
// import { useRouter, } from "next/navigation";
// // import { storage } from "@/lib/firebase";
// // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { useState } from "react";




// interface Props {
//   btnTitle: string;
//   employee?: {
//     id?: string;
//     name: string;
//     email: string;
//     phone: string;
//     jobTitle: string;
//     department: string;
//     salary: string;
//   };
// }




// const EmployeeForm = ({ btnTitle, employee }: Props) => {
//   const router = useRouter();
//   const {
//     handleSubmit,
//     register,
//     formState: { errors, isSubmitting },
//   } = useForm<employeeValidationType>({
//     resolver: zodResolver(employeeValidation),
//     defaultValues: {
//       name: employee?.name,
//       email: employee?.email,
//       phone: employee?.phone,
//       jobTile: employee?.jobTitle,
//       department: employee?.department,
//       salary: employee?.salary,
//     },
//   });

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<string>("");
  
//   const handleFileUpload = async (file: File) => {
//     if (!file || !employee?.id) return;
    
//     try {
//       setUploadStatus("Uploading...");
      
//       const storageRef = ref(storage, `documents/${employee.id}/${file.name}`);
      
//       await uploadBytes(storageRef, file);
      
//       const downloadURL = await getDownloadURL(storageRef);
      
//       await updateEmployee({
//         ...employee,
//         documents: [...(employee.documents || []), downloadURL],
//       });
      
//       setUploadStatus("Upload successful!");
//       setSelectedFile(null);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploadStatus("Upload failed. Please try again.");
//     }
//   };

//   const onSubmit = async (values: employeeValidationType) => {
//     try {
//       // Update employee details
//       await updateEmployee({
//         id: employee?.id,
//         name: values.name,
//         email: values.email,
//         phone: values.phone,
//         jobTitle: values.jobTile,
//         department: values.department,
//         salary: values.salary,
//       });

//       // Upload file if selected
//       if (selectedFile) {
//         await handleFileUpload(selectedFile);
//       }

//       window.close();
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//       alert("Failed to submit the form. Please try again.");
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
//       <div className="flex gap-5 max-sm:flex-col">
//         <TextInput<employeeValidationType>
//           register={register}
//           name="name"
//           type="text"
//           label="First and Last Name"
//           placeholder="Enter Your first and last name..."
//           errorMessage={errors.name?.message}
//         />
//       </div>
//       <div className="flex gap-5 max-sm:flex-col">
//         <TextInput<employeeValidationType>
//           register={register}
//           name="email"
//           type="text"
//           label="Email"
//           placeholder="Enter your email..."
//           errorMessage={errors.email?.message}
//         />
//         <TextInput<employeeValidationType>
//           register={register}
//           name="phone"
//           type="text"
//           label="UK Phone Number"
//           placeholder="Enter your working UK Phone Number"
//           errorMessage={errors.phone?.message}
//         />
//       </div>
//       <div className="flex gap-5 max-sm:flex-col">
//         <TextInput<employeeValidationType>
//           register={register}
//           name="jobTile"
//           type="text"
//           label="Address & Postcode"
//           placeholder="Enter your current address and postcode"
//           errorMessage={errors.jobTile?.message}
//         />
//         <TextInput<employeeValidationType>
//           register={register}
//           name="department"
//           type="text"
//           label="FOR OFFICIAL USE ONLY"
//           placeholder="LEAVE BLANK"
//           errorMessage={errors.department?.message}
//         />
//       </div>
//       <div className="flex gap-5 max-sm:flex-col">
//         <TextInput<employeeValidationType>
//           register={register}
//           name="salary"
//           type="text"
//           label="Create Password"
//           placeholder="Enter 8 Digit Numeric Password"
//           errorMessage={errors.salary?.message}
//         />
//       </div>

//       <div className="flex flex-col gap-2">
//         <label className="text-gray-700">Upload Documents</label>
//         <input
//           type="file"
//           onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//           className="file-input file-input-bordered w-full"
//           accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//         />
//         {uploadStatus && (
//           <p className={`text-sm ${uploadStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
//             {uploadStatus}
//           </p>
//         )}
//       </div>

//       <div className="text-grey"></div>
//       <div>
        

        
       

// <button
//           type="submit"
//           disabled={isSubmitting}
//           className="btn btn-primary btn-wide mt-5"
//         >
//           {btnTitle}
//         </button>

//       </div>
//     </form>
//   );
// };

// export default EmployeeForm;
