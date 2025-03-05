"use client";

import { MdArchive, MdUnarchive, MdDeleteSweep } from 'react-icons/md';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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

interface Props {
  documents: Document[];
  onStatusUpdate: (documentId: string, status: 'approved' | 'declined') => void;
  note: string;
  setNote: (note: string) => void;
}

const sendNoteByEmail = (note: string, staffId: string) => {
  const subject = encodeURIComponent('Royacare Agency');
  const body = encodeURIComponent(`: ${note}`);
  const mailtoLink = `mailto:majolagbedaniel@gmail.com?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
};

const DocumentGrid = ({ documents, onStatusUpdate, note, setNote }: Props) => {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [archivedDocs, setArchivedDocs] = useState<string[]>([]);
  const [staffProfiles, setStaffProfiles] = useState<{[key: string]: string}>({});
  const [localDocuments, setLocalDocuments] = useState(documents);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());

  useEffect(() => {
    const fetchStaffProfiles = async () => {
      try {
        const profiles: {[key: string]: string} = {};
        const uniqueStaffIds = Array.from(new Set(documents.map(doc => doc.staffId)));
        
        for (const staffId of uniqueStaffIds) {
          const response = await fetch(`/api/staff/profile?staffId=${staffId}`);
          const data = await response.json();
          profiles[staffId] = data.name || '';
        }
        setStaffProfiles(profiles);
      } catch (error) {
        console.error('Error fetching staff profiles:', error);
      }
    };
    fetchStaffProfiles();
  }, [documents]);

  useEffect(() => {
    setLocalDocuments(documents);

    const refreshDocuments = async () => {
      try {
        const currentTime = new Date();
        const timeSinceLastRefresh = currentTime.getTime() - lastRefreshTime.getTime();
        
        if (timeSinceLastRefresh < 30000) {
          return;
        }

        const uniqueStaffIds = Array.from(new Set(localDocuments.map(doc => doc.staffId)));
        let newDocuments: Document[] = [...localDocuments];
        let hasChanges = false;

        for (const staffId of uniqueStaffIds) {
          const response = await fetch(`/api/staff/documents?staffId=${staffId}`);
          if (response.ok) {
            const data = await response.json();
            
            const currentDocs = newDocuments.filter(doc => doc.staffId === staffId);
            const incomingDocs = data.documents;
            
            if (JSON.stringify(currentDocs) !== JSON.stringify(incomingDocs)) {
              newDocuments = newDocuments.filter(doc => doc.staffId !== staffId);
              newDocuments.push(...data.documents);
              hasChanges = true;
            }
          }
        }

        if (hasChanges) {
          setLocalDocuments(newDocuments);
          setLastRefreshTime(currentTime);
        }
      } catch (error) {
        console.error('Error refreshing documents:', error);
      }
    };

    const refreshInterval = setInterval(refreshDocuments, 30000);

    return () => clearInterval(refreshInterval);
  }, [documents]);

  const handleSelectDoc = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocs.length === documents.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(documents.map(doc => doc._id));
    }
  };

  const handleArchiveSelected = async () => {
    try {
      const response = await fetch('/api/staff/documents/archive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentIds: selectedDocs }),
      });

      if (response.ok) {
        setArchivedDocs(prev => [...prev, ...selectedDocs]);
        setSelectedDocs([]);
      } else {
        console.error('Failed to archive documents');
      }
    } catch (error) {
      console.error('Error archiving documents:', error);
    }
  };

  const handleUnarchive = async (docId: string) => {
    try {
      const response = await fetch('/api/staff/documents/unarchive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId: docId }),
      });

      if (response.ok) {
        setArchivedDocs(prev => prev.filter(id => id !== docId));
      } else {
        console.error('Failed to unarchive document');
      }
    } catch (error) {
      console.error('Error unarchiving document:', error);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all submissions on this page? This action cannot be undone.')) {
      return;
    }

    try {
      const visibleDocs = localDocuments.map(doc => doc._id);
      const response = await fetch('/api/staff/documents/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentIds: visibleDocs }),
      });

      if (response.ok) {
        setArchivedDocs(prev => [...prev, ...visibleDocs]);
        setSelectedDocs([]);
        toast.success('All submissions cleared successfully');
      } else {
        toast.error('Failed to clear submissions');
      }
    } catch (error) {
      console.error('Error clearing documents:', error);
      toast.error('Failed to clear submissions');
    }
  };

  const handleStatusUpdate = (docId: string, status: 'approved' | 'declined') => {
    onStatusUpdate(docId, status);
    setArchivedDocs(prev => [...prev, docId]);
    
    if (status === 'approved') {
      toast.success('Document approved successfully', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#10B981',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '✅'
      });
    } else {
      toast.error('Document rejected', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '❌'
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return 'No date';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const sortedDocuments = [...localDocuments]
    .filter(doc => showArchived ? archivedDocs.includes(doc._id) : !archivedDocs.includes(doc._id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          {/* <button 
            onClick={handleSelectAll} 
            className="px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            {selectedDocs.length === documents.length ? 'Deselect All' : 'Select All'}
          </button> */}
           {!showArchived && (
          <button 
            onClick={handleArchiveSelected} 
            className="px-4 py-2 bg-white border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedDocs.length === 0}
          >
            Archive Selected ({selectedDocs.length})
          </button>
        )}
          <button 
            onClick={() => setShowArchived(!showArchived)}
            className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
              showArchived 
                ? 'bg-gray-100 border-gray-600 text-gray-600 hover:bg-gray-200'
                : 'bg-white border-gray-600 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {showArchived ? 'Show Active/Pending' : 'Show Actioned'}
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
          >
            <MdDeleteSweep size={20} />
            Clear All
          </button>
        </div>
       
      </div>

      {sortedDocuments.map((doc) => (
        <div 
          key={doc._id} 
          className={`border-2 rounded-lg p-6 bg-white shadow-sm transition-all duration-200 ${
            selectedDocs.includes(doc._id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
          onClick={() => handleSelectDoc(doc._id)}
        >
          <div className="flex justify-between items-start">
            <div>
              {staffProfiles[doc.staffId] && (
                <h3 className="text-lg font-semibold text-[#0F1531] mb-1">
                  {staffProfiles[doc.staffId]}
                </h3>
              )}
              <h3 className="text-sm font-semibold">ID: {doc.staffId}</h3>
              <p className="text-sm text-gray-600">Stage: {doc.stage}</p>
              <p className={`text-sm font-medium ${
                doc.status === 'pending' ? 'text-yellow-600' : 
                doc.status === 'approved' ? 'text-green-600' : 'text-red-600'
              }`}>
                Status: {doc.status}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Submitted: {formatDate(doc.createdAt)}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <a 
                href={doc.url} 
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 font-medium transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                View
              </a>
              {showArchived ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnarchive(doc._id);
                  }}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                  title="Unarchive"
                >
                  <MdUnarchive size={20} />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArchiveSelected();
                  }}
                  className="text-gray-600 hover:text-gray-800 p-2 rounded-lg border-2 border-gray-600 hover:bg-gray-50 transition-colors"
                  title="Archive"
                >
                  <MdArchive size={20} />
                </button>
              )}
            </div>
          </div>

          {doc.status === 'pending' && !showArchived && (
            <div className="mt-6 space-y-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col space-y-2">
                <div className="flex gap-2 p-2 bg-gray-50 border-2 border-b-0 rounded-t-lg">
                  <button
                    onClick={() => {
                      const textarea = document.getElementById(`note-${doc._id}`) as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = textarea.value;
                      const newText = text.substring(0, start) + '**' + text.substring(start, end) + '**' + text.substring(end);
                      setNote(newText);
                    }}
                    className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    onClick={() => {
                      const textarea = document.getElementById(`note-${doc._id}`) as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = textarea.value;
                      const newText = text.substring(0, start) + '_' + text.substring(start, end) + '_' + text.substring(end);
                      setNote(newText);
                    }}
                    className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    onClick={() => {
                      const textarea = document.getElementById(`note-${doc._id}`) as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = textarea.value;
                      const newText = text.substring(0, start) + '* ' + text.substring(start);
                      setNote(newText);
                    }}
                    className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                    title="Bullet Point"
                  >
                    •
                  </button>
                  <div className="h-6 w-px bg-gray-300 mx-1" />
                  <button
                    onClick={() => setNote('')}
                    className="p-1.5 rounded hover:bg-gray-200 transition-colors text-red-500"
                    title="Clear"
                  >
                    Clear
                  </button>
                </div>
                <textarea
                  id={`note-${doc._id}`}
                  placeholder="Add notes for the staff member..."
                  className="w-full p-6 border-2 rounded-b-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[120px] font-sans text-base"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleStatusUpdate(doc._id, 'approved')}
                  className="flex-1 py-2 px-4 bg-white border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-all duration-200 font-medium"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(doc._id, 'declined')}
                  className="flex-1 py-2 px-4 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium"
                >
                  Reject
                </button>
              </div>
            </div>
          )}

          {doc.notes && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-700">Notes:</p>
              <p className="text-gray-600 mt-1">{doc.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentGrid; 