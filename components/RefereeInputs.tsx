import { useState } from 'react';
import toast from 'react-hot-toast';

interface RefereeInputsProps {
  staffId: string;
  onSubmitSuccess: () => void;
  existingReferees: any[];
  companies: string[];
}

const RefereeInputs = ({ staffId, onSubmitSuccess, existingReferees, companies }: RefereeInputsProps) => {
  const [referees, setReferees] = useState(
    companies.map((company, index) => ({
      text: existingReferees.find(r => r.index === index)?.text || '',
      status: existingReferees.find(r => r.index === index)?.status || 'pending',
      company: company
    }))
  );

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/staff/referees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId,
          stage: 2,
          referees: referees.map((ref, index) => ({
            text: ref.text,
            index,
            company: ref.company
          }))
        })
      });

      if (!response.ok) throw new Error('Failed to submit referees');
      
      onSubmitSuccess();
      toast.success('Referee information submitted successfully');
    } catch (error) {
      console.error('Error submitting referees:', error);
      toast.error('Failed to submit referee information');
    }
  };

  return (
    <div className="space-y-4">
      {referees.map((referee, index) => (
        <div key={index} className="space-y-2">
          <label className="block font-medium">
            {companies[index]}
          </label>
          <textarea
            value={referee.text}
            onChange={(e) => {
              const newReferees = [...referees];
              newReferees[index].text = e.target.value;
              setReferees(newReferees);
            }}
            disabled={referee.status === 'approved' || referee.status === 'pending'}
            className="w-full p-2 border rounded-md min-h-[100px]"
            placeholder="Provide contact detail of REFEREE SUCH AS REFEREE NAME, POSITION OF REFEREE, REFEREE EMAIL ADDRESS, REFEREE PHONE NUMBER"
          />
          {referee.status && (
            <div className={`text-sm ${
              referee.status === 'approved' ? 'text-green-600' : 
              referee.status === 'rejected' ? 'text-red-600' : 
              'text-amber-600'
            }`}>
              Status: {referee.status.charAt(0).toUpperCase() + referee.status.slice(1)}
            </div>
          )}
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

export default RefereeInputs;