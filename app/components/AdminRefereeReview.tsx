import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const AdminRefereeReview = () => {
  const [referees, setReferees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllReferees();
  }, []);

  const fetchAllReferees = async () => {
    try {
      const response = await fetch('/api/admin/referees');
      if (response.ok) {
        const data = await response.json();
        setReferees(data);
      }
    } catch (error) {
      console.error('Error fetching referees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (refereeId: string, status: string, notes: string) => {
    try {
      const response = await fetch('/api/admin/referees', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refereeId, status, adminNotes: notes })
      });

      if (response.ok) {
        toast.success(`Referee ${status} successfully`);
        fetchAllReferees();
      } else {
        toast.error('Failed to update referee status');
      }
    } catch (error) {
      console.error('Error updating referee:', error);
      toast.error('Failed to update referee status');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Referee Reviews</h2>
      {referees.map((referee: any) => (
        <div key={referee._id} className="border p-4 rounded-md">
          <div className="space-y-2">
            <p><strong>Staff Name:</strong> {referee.staffId}</p>
            <p><strong>Referee {referee.index + 1}:</strong></p>
            <p className="whitespace-pre-wrap bg-gray-50 p-2 rounded">{referee.text}</p>
            <div className="space-x-2">
              <button
                onClick={() => handleStatusUpdate(referee._id, 'approved', '')}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  const notes = prompt('Enter rejection reason:');
                  if (notes) handleStatusUpdate(referee._id, 'rejected', notes);
                }}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Reject
              </button>
            </div>
            {referee.adminNotes && (
              <p className="text-red-600">Admin Notes: {referee.adminNotes}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}; 