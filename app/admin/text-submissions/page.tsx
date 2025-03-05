"use client";

import { useEffect, useState } from 'react';

interface TextSubmission {
  id: string;
  staffId: string;
  text: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'declined';
  company?: string;
}

export default function TextSubmissions() {
  const [submissions, setSubmissions] = useState<TextSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/staff/referees');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setError(error instanceof Error ? error.message : 'Failed to load submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0F1531]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Text Submissions</h1>
      <div className="grid gap-4">
        {submissions.map((submission) => (
          <div 
            key={submission.id} 
            className="border rounded-lg p-4 bg-white shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="font-semibold">{submission.staffId}</h3>
                {submission.company && (
                  <p className="text-sm text-gray-600">Company: {submission.company}</p>
                )}
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{submission.text}</p>
                <p className="text-sm text-gray-500">
                  Submitted: {new Date(submission.submittedAt).toLocaleString()}
                </p>
                <p className={`text-sm ${
                  submission.status === 'pending' ? 'text-yellow-600' : 
                  submission.status === 'approved' ? 'text-green-600' : 'text-red-600'
                }`}>
                  Status: {submission.status}
                </p>
              </div>
              
              {submission.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch(`/api/staff/referees/${submission.id}`, {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ status: 'approved' })
                        });
                        if (response.ok) {
                          setSubmissions(prev => 
                            prev.map(sub => 
                              sub.id === submission.id 
                                ? { ...sub, status: 'approved' }
                                : sub
                            )
                          );
                        }
                      } catch (error) {
                        console.error('Error approving submission:', error);
                      }
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch(`/api/staff/referees/${submission.id}`, {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ status: 'declined' })
                        });
                        if (response.ok) {
                          setSubmissions(prev => 
                            prev.map(sub => 
                              sub.id === submission.id 
                                ? { ...sub, status: 'declined' }
                                : sub
                            )
                          );
                        }
                      } catch (error) {
                        console.error('Error declining submission:', error);
                      }
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 