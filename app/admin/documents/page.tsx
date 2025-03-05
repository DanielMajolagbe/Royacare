"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { MdRateReview, MdSwapVert, MdBusinessCenter, MdPeople, MdHistory, MdPersonAdd, MdKeyboardArrowDown, MdLogout, MdOpenInNew, MdNotifications } from 'react-icons/md';

interface Document {
  _id: string;
  name: string;
  url: string;
  stage: number;
  status: string;
  staffId: string;
  notes?: string;
  createdAt: string;
  archived?: boolean;
}

interface StaffInfo {
  id: string;
  currentStage: number;
  documentCount: number;
  name?: string;
}

// Dynamically import components
const DocumentGrid = dynamic(() => import('@/components/admin/DocumentGrid'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const AdminDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffFilter, setStaffFilter] = useState('all');
  const [staffSearch, setStaffSearch] = useState('');
  const router = useRouter();
  const [pendingRefs, setPendingRefs] = useState(0);
  const [currentAdmin, setCurrentAdmin] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasPendingRefs, setHasPendingRefs] = useState(false);
  const [pendingSubmissions, setPendingSubmissions] = useState(0);

  useEffect(() => {
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }
    setCurrentAdmin(adminUser.toLowerCase());

    fetchDocuments();
    fetchPendingRefs();
  }, []);

  useEffect(() => {
    // Count pending submissions (documents without approved/declined status)
    const pending = documents.filter(doc => !doc.status || doc.status === 'pending').length;
    setPendingSubmissions(pending);
  }, [documents]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/admin/documents');
      const data = await response.json();
      setDocuments(data.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRefs = async () => {
    try {
      const response = await fetch('/api/admin/ref-companies');
      if (!response.ok) {
        throw new Error('Failed to fetch ref companies');
      }
      const data = await response.json();
      if (!data || !data.staff) {
        setPendingRefs(0);
        setHasPendingRefs(false);
        return;
      }
      const pendingCount = data.staff.filter((s: { documentsApproved: boolean, companies: any }) => s.documentsApproved && !s.companies).length;
      setPendingRefs(pendingCount);
      setHasPendingRefs(pendingCount > 0);
    } catch (error) {
      console.error('Error fetching pending refs:', error);
      setPendingRefs(0);
      setHasPendingRefs(false);
    }
  };

  const getStaffInfo = (): StaffInfo[] => {
    const staffMap = new Map<string, StaffInfo>();
    
    documents.forEach(doc => {
      if (!staffMap.has(doc.staffId)) {
        staffMap.set(doc.staffId, {
          id: doc.staffId,
          currentStage: doc.stage,
          documentCount: 1
        });
      } else {
        const info = staffMap.get(doc.staffId)!;
        info.currentStage = Math.max(info.currentStage, doc.stage);
        info.documentCount += 1;
      }
    });

    return Array.from(staffMap.values());
  };

  const StaffModal = () => {
    const [staffProfiles, setStaffProfiles] = useState<{[key: string]: string}>({});
    const staffInfo = getStaffInfo();
    const filteredStaff = staffInfo
      .filter(staff => 
        (staffFilter === 'all' || staff.currentStage === parseInt(staffFilter)) &&
        staff.id.toLowerCase().includes(staffSearch.toLowerCase())
      );

    useEffect(() => {
      const fetchStaffProfiles = async () => {
        try {
          const profiles: {[key: string]: string} = {};
          for (const staff of staffInfo) {
            const response = await fetch(`/api/staff/profile?staffId=${staff.id}`);
            const data = await response.json();
            profiles[staff.id] = data.name || '';
          }
          setStaffProfiles(profiles);
        } catch (error) {
          console.error('Error fetching staff profiles:', error);
        }
      };
      fetchStaffProfiles();
    }, [staffInfo]);

    return (
      <div className={`fixed inset-0 bg-white z-50 ${showStaffModal ? '' : 'hidden'}`}>
        <div className="h-full flex flex-col">
          <div className="bg-[#0F1531] text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Staff Management</h2>
            <button 
              onClick={() => setShowStaffModal(false)}
              className="text-white hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="p-4 bg-gray-50 border-b flex gap-4 items-center">
            <input
              type="text"
              placeholder="Search staff..."
              value={staffSearch}
              onChange={(e) => setStaffSearch(e.target.value)}
              className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#0F1531]"
            />
            <select
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F1531]"
            >
              <option value="all">All Stages</option>
              <option value="1">Stage 1</option>
              <option value="2">Stage 2</option>
              <option value="3">Stage 3</option>
              <option value="4">Stage 4</option>
              <option value="5">Stage 5</option>
              <option value="6">Stage 6</option>
              <option value="7">Stage 7</option>
              <option value="8">Stage 8</option>
              <option value="9">Stage 9</option>
              <option value="10">Stage 10</option>
              <option value="11">Stage 11</option>
              <option value="12">Stage 12</option>
            </select>
            <div className="text-sm text-gray-600">
              Showing {filteredStaff.length} of {staffInfo.length} staff members
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              {filteredStaff.map((staff, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      {staffProfiles[staff.id] && (
                        <h3 className="font-semibold text-lg text-[#0F1531]">
                          {staffProfiles[staff.id]}
                        </h3>
                      )}
                      <h3 className="font-semibold text-lg">Staff ID: {staff.id}</h3>
                      {/* <h3 className="font-semibold text-lg">Email Address: </h3> */}
                      {/* <p className="text-sm text-gray-600">Current Stage: {staff.currentStage}</p> */}
                      <p className="text-sm text-gray-600">Passport Expiry: </p>
                      <p className="text-sm text-gray-600">DBS Expiry: </p>
                      <p className="text-sm text-gray-600">TRAINING Expiry: </p>
                      <p className="text-sm text-gray-600">RTW Expiry: </p>
                    </div>
                    <div className={`px-2 py-1 rounded text-sm ${
                      staff.currentStage === 1 ? 'bg-red-100 text-red-800' :
                      staff.currentStage === 4 ? 'bg-green-100 text-green-800' :
                      staff.currentStage === 3 ? 'bg-blue-100 text-blue-800' :
                      staff.currentStage === 2 ? 'bg-yellow-100 text-yellow-800' :
                      staff.currentStage === 5 ? 'bg-purple-100 text-purple-800' :
                      staff.currentStage === 6 ? 'bg-orange-100 text-orange-800' :
                      staff.currentStage === 7 ? 'bg-pink-100 text-pink-800' :
                      staff.currentStage === 8 ? 'bg-gray-100 text-gray-800' :
                      staff.currentStage === 9 ? 'bg-gray-100 text-gray-800' :
                      staff.currentStage === 10 ? 'bg-gray-100 text-gray-800' :
                      staff.currentStage === 11 ? 'bg-gray-100 text-gray-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      Stage {staff.currentStage}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t p-4 bg-gray-50">
            <p className="text-gray-600">
              Total Staff: <span className="font-bold">{staffInfo.length}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const logActivity = async (action: string, details: string) => {
    try {
      await fetch('/api/admin/activity-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminUser: sessionStorage.getItem('adminUser'),
          action,
          details
        })
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  const handleStatusUpdate = async (documentId: string, status: 'approved' | 'declined') => {
    try {
      const response = await fetch('/api/admin/documents/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId,
          status,
          note,
        }),
      });

      if (response.ok) {
        const document = documents.find(doc => doc._id === documentId);
        await logActivity(
          `Document ${status} - ${document?.staffId}`,
          `Passport Data Page from ${document?.staffId} was ${status}${note ? ` with note: ${note}` : ''}`
        );
        fetchDocuments();
        setNote('');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.staffId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
  <MdPeople className="mr-2" /> 
  Tracker - Ongoing Application
</h1>

          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <div className="relative">
              <div className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <MdNotifications size={24} className="text-gray-700" />
                {pendingSubmissions > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingSubmissions}
                  </span>
                )}
              </div>
            </div>

            {/* Existing Actions Dropdown */}
            <div className="relative"> 
  <button
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center"
  >
    <span><b>Actions</b></span>
    <MdKeyboardArrowDown className="ml-2" />
  </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="py-1">
                    <button 
                      onClick={() => window.location.href = '/admin/referees'}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                    >
                      <MdRateReview className="mr-2" />
                      Pending Reference Submissions
                      {hasPendingRefs && (
                        <span className="ml-2 bg-red-600 rounded-full w-2 h-2"></span>
                      )}
                    </button>
                    
                    <a href="https://royacare4-cove2.vercel.app/edit-staff-login" target="_blank" rel="noopener noreferrer">
  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center">
    <MdPeople className="mr-2" />
    Tracker
    <MdOpenInNew className="ml-2" />
  </button>
</a>
                    
                    <button
                      onClick={() => window.location.href = 'https://royacare-create-staff.vercel.app'}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                    >
                      <MdPersonAdd className="mr-2" />
                      Add New Staff
                    </button>
                    
                    <button
                      onClick={() => window.location.href = '/admin/stage-jump'}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                    >
                      <MdSwapVert className="mr-2" />
                      Update Staff Stage 
                    </button>

                    {currentAdmin === 'joshua' && (
                      <button
                        onClick={() => setShowStaffModal(true)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                      >
                        <MdPeople className="mr-2" />
                        Ongoing Application
                      </button>
                    )}


<div className="relative">
              <button 
                onClick={() => window.location.href = '/admin/ref-companies'}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
              >
                <span className="absolute -top-2 -left-2 bg-red-600 rounded-full w-4 h-4"></span>
                <MdBusinessCenter className="mr-2" />
                Identify Referees
              </button>
            </div>

         

                    <button
                      onClick={() => {
                        sessionStorage.removeItem('adminUser');
                        router.push('/admin/login');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center text-red-600"
                    >
                      <MdLogout className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by staff name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#0F1531] focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-2 text-gray-600 hover:text-gray-800"
            >
              Clear
            </button>
          )}
          <div className="text-sm text-gray-600">
            Showing {filteredDocuments.length} of {documents.length} submissions
          </div>
        </div>
      </div>

      <StaffModal />

      <Suspense fallback={<div>Loading documents...</div>}>
        <DocumentGrid 
          documents={filteredDocuments}
          onStatusUpdate={handleStatusUpdate}
          note={note}
          setNote={setNote}
        />
      </Suspense>
    </div>
  );
};

export default AdminDocuments; 