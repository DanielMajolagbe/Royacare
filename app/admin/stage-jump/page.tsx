"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function StageJumpPage() {
  const [staffId, setStaffId] = useState("");
  const [targetStage, setTargetStage] = useState("");
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }
  }, []);

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

  const handleStageJump = async () => {
    if (!staffId || !targetStage) {
      setMessage({ type: 'error', text: 'Please enter both Staff ID and Stage number' });
      return;
    }

    // Validate stage number
    const stageNum = Number(targetStage);
    if (isNaN(stageNum) || stageNum < 1 || stageNum > 130) {
      setMessage({ type: 'error', text: 'Stage must be a number between 1 and 12' });
      return;
    }

    try {
      // First update the staff progress
      const progressResponse = await fetch('/api/staff/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staffId: staffId.trim(),
          currentStage: stageNum
        })
      });

      if (!progressResponse.ok) {
        throw new Error('Failed to update staff progress');
      }

      // Then update the stage-jump record
      const response = await fetch('/api/admin/stage-jump', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staffId: staffId.trim(),
          targetStage: stageNum
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update stage');
      }

      // Log the activity
      await logActivity(
        'Stage Update',
        `Updated staff ${staffId} to stage ${targetStage}`
      );
      
      setMessage({ type: 'success', text: `Successfully moved staff ${staffId} to stage ${targetStage}` });
      setStaffId("");
      setTargetStage("");
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update stage. Please try again.' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Update Staff Stage</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Staff Name
              </label>
              <input
                type="text"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Staff Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Stage
              </label>
              <input
                type="number"
                value={targetStage}
                onChange={(e) => setTargetStage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                min="1"
                max="12"
                placeholder="Enter Stage (1-12)"
              />
            </div>

            {message.text && (
              <div className={`p-4 rounded-md ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <button
              onClick={handleStageJump}
              className="w-full py-2 px-4 bg-[#0F1531] text-white rounded-md hover:bg-[#0F1531] transition-colors"
            >
              Move to Stage
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 