import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface RefereeStageProps {
  staffId: string;
  cvNote: string;
  onComplete: () => void;
}

export const RefereeStage: React.FC<RefereeStageProps> = ({ staffId, cvNote, onComplete }) => {
  const [referees, setReferees] = useState<Array<{ text: string; status: string }>>([
    { text: '', status: 'pending' },
    { text: '', status: 'pending' },
    { text: '', status: 'pending' },
    { text: '', status: 'pending' },
    { text: '', status: 'pending' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferees();
  }, []);

  const fetchReferees = async () => {
    try {
      const response = await fetch(`/api/staff/referees?staffId=${staffId}&stage=2`);
      if (response.ok) {
        const data = await response.json();
        const existingReferees = data.reduce((acc: any, ref: any) => {
          acc[ref.index] = { text: ref.text, status: ref.status };
          return acc;
        }, {});
        
        setReferees(prev => prev.map((ref, i) => ({
          ...ref,
          ...existingReferees[i]
        })));
      }
    } catch (error) {
      console.error('Error fetching referees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/staff/referees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId,
          stage: 2,
          referees: referees.map(ref => ({ text: ref.text }))
        })
      });

      if (response.ok) {
        toast.success('Referee information submitted successfully');
        fetchReferees();
      } else {
        toast.error('Failed to submit referee information');
      }
    } catch (error) {
      console.error('Error submitting referees:', error);
      toast.error('Failed to submit referee information');
    }
  };

  const allApproved = referees.every(ref => ref.status === 'approved');
  useEffect(() => {
    if (allApproved) {
      onComplete();
    }
  }, [allApproved]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium mb-2">CV Notes from Stage 1:</h3>
        <p>{cvNote}</p>
      </div>

      {referees.map((referee, index) => (
        <div key={index} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Referee {index + 1}
          </label>
          <textarea
            value={referee.text}
            onChange={(e) => {
              const newReferees = [...referees];
              newReferees[index] = { ...referee, text: e.target.value };
              setReferees(newReferees);
            }}
            disabled={referee.status !== 'pending'}
            className={`w-full p-2 border rounded-md ${
              referee.status !== 'pending' ? 'bg-gray-100' : ''
            }`}
            rows={3}
            placeholder="Enter referee details"
          />
          <div className={`text-sm ${
            referee.status === 'approved' ? 'text-green-600' :
            referee.status === 'rejected' ? 'text-red-600' :
            'text-gray-600'
          }`}>
            Status: {referee.status}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={referees.some(ref => !ref.text.trim())}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        Submit Referee Information
      </button>
    </div>
  );
}; 