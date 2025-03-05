"use client";

import { useState, useEffect } from "react";

export default function AdminCVNotesPage() {
  const [submissions, setSubmissions] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/cv-notes');
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.submissions);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleApproval = async (submissionId: string, approved: boolean) => {
    try {
      const response = await fetch('/api/admin/cv-notes/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissionId, approved })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: `Successfully ${approved ? 'approved' : 'rejected'} submission` });
        fetchSubmissions(); // Refresh the list
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update submission' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update submission' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">CV Notes Review</h1>

          {message.text && (
            <div className={`p-4 rounded-md mb-6 ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            {submissions.map((submission: any) => (
              <div key={submission._id} className="border rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {Object.entries(submission.formData).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700">{key}</label>
                      <p className="mt-1">{value as string}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleApproval(submission._id, true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(submission._id, false)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 