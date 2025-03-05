"use client";

import { useState, useEffect } from 'react';
import { MdBusinessCenter, MdPerson } from 'react-icons/md';

interface StaffWithDocuments {
  staffId: string;
  stage: number;
  companies?: string[];
  documentsApproved: boolean;
}

export default function RefCompaniesPage() {
  const [staffList, setStaffList] = useState<StaffWithDocuments[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<string>('');
  const [companies, setCompanies] = useState<string[]>(['', '', '', '', '']);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showCompanyFields, setShowCompanyFields] = useState(false);
  const [referenceType, setReferenceType] = useState<'company' | 'character'>('company');

  useEffect(() => {
    fetchStaffWithApprovedDocs();
  }, []);

  const fetchStaffWithApprovedDocs = async () => {
    try {
      const response = await fetch('/api/admin/ref-companies');
      const data = await response.json();
      setStaffList(data.staff);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedStaff) {
      setMessage({ type: 'error', text: 'Please select a staff member' });
      return;
    }

    if (companies.some(company => !company.trim())) {
      setMessage({ type: 'error', text: `Please enter all 5 ${referenceType === 'company' ? 'companies' : 'character references'}` });
      return;
    }

    try {
      const response = await fetch('/api/admin/ref-companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId: selectedStaff,
          companies: companies
        })
      });

      if (!response.ok) throw new Error('Failed to save references');

      setMessage({ type: 'success', text: `${referenceType === 'company' ? 'Companies' : 'Character References'} identified successfully` });
      fetchStaffWithApprovedDocs();
      setSelectedStaff('');
      setCompanies(['', '', '', '', '']);
      setShowCompanyFields(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save references' });
    }
  };

  const handleTypeSelection = (type: 'company' | 'character') => {
    setReferenceType(type);
    setShowCompanyFields(true);
    setCompanies(['', '', '', '', '']);
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Assign References</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Staff Member
          </label>
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Staff</option>
            {staffList?.length > 0 ? (
              staffList.map((staff) => (
                <option key={staff.staffId} value={staff.staffId}>
                  {staff.staffId} {staff.documentsApproved ? '(Ready for references)' : '(Kindly Identify Referees)'}
                </option>
              ))
            ) : (
              <option value="" disabled>Loading staff members...</option>
            )}
          </select>
        </div>

        {selectedStaff && !showCompanyFields && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleTypeSelection('company')}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <MdBusinessCenter size={20} />
              Professional Reference
            </button>
            <button
              onClick={() => handleTypeSelection('character')}
              className="flex-1 py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <MdPerson size={20} />
              Character Reference
            </button>
          </div>
        )}

        {showCompanyFields && (
          <>
          <div className="space-y-4">
            {companies.map((company, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {referenceType === 'company' ? `Company ${index + 1}` : `Character Reference ${index + 1}`}
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => {
                    const newCompanies = [...companies];
                    newCompanies[index] = e.target.value;
                    setCompanies(newCompanies);
                  }}
                    className="w-full p-3 border rounded-md text-lg"
                    placeholder={`Enter ${referenceType === 'company' ? 'Company' : 'Character Reference'} ${index + 1}`}
                />
              </div>
            ))}
          </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowCompanyFields(false)}
                className="flex-1 py-3 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </>
        )}

        {message.text && (
          <div className={`mt-4 p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
} 