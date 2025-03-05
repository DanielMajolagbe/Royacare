'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function AdminRefereeReview() {
  const [referees, setReferees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferees();
  }, []);

  const fetchReferees = async () => {
    try {
      const response = await fetch('/api/admin/referees');
      if (response.ok) {
        const data = await response.json();
        setReferees(data);
      }
    } catch (error) {
      console.error('Error fetching referees:', error);
      toast.error('Failed to fetch referees');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (refereeId: string, status: string, notes?: string) => {
    try {
      const response = await fetch('/api/admin/referees', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          refereeId, 
          status, 
          adminNotes: notes || '' 
        })
      });

      if (response.ok) {
        toast.success(`Referee ${status} successfully`);
        fetchReferees();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 ml-14 mt-14">
      <h1 className="text-2xl font-bold mb-6">Reference Review</h1>
      <div className="space-y-6">
        {referees.map((referee: any) => (
          <div key={referee._id} className="border p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              <p className="font-medium">{referee.staffId}</p>
              <p className="text-gray-600">Referee {referee.index + 1}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded bg-white mb-4">
              <p className="whitespace-pre-wrap">{referee.text}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleStatusUpdate(referee._id, 'approved')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Reference Completed
              </button>
              <button
                onClick={() => {
                  const notes = prompt('Enter rejection reason:');
                  if (notes) handleStatusUpdate(referee._id, 'rejected', notes);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Reject
              </button>
              <button
  onClick={() => window.location.href = 'https://royacacre-reference-system.vercel.app/'}
  className="px-4 py-2 bg-[#394E6A] text-white rounded-md hover:bg-[#4A5D7D] transition-colors"
>
  Send Reference Email
</button>

            </div>
            {referee.adminNotes && (
              <p className="mt-4 text-red-600">Admin Notes: {referee.adminNotes}</p>
            )}
          </div>
        ))}
        {referees.length === 0 && (
          <p className="text-gray-500">No pending referee submissions to review</p>
        )}
      </div>
    </div>
  );
} 