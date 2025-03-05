"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ActivityLog {
  staffId: string;
  adminUser: string;
  action: string;
  details: string;
  timestamp: string;
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }

    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/admin/activity-log');
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.adminUser === filter);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Activity Logs</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="all">All Users</option>
          <option value="abigail">ABIGAIL</option>
          <option value="samuel">SAMUEL</option>
          <option value="michael">MICHAEL</option>
          <option value="john">JOHN</option>
          <option value="daniel">DANIEL</option>
          <option value="delle">DELLE</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <div key={log.staffId} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium capitalize">{log.adminUser}</p>
                <p className="text-gray-600">{log.action}</p>
                <p className="text-sm text-gray-500">{log.details}</p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 



