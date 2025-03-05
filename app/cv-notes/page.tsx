'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Note {
  _id: string;
  staffId: string;
  content: string;
  createdAt: string;
}

export default function CVNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/staff/text-submissions?type=cv-note');
      const data = await response.json();
      setNotes(data.submissions || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">CV Notes</h1>
      
      <div className="grid gap-4">
        {notes.map((note) => (
          <div 
            key={note._id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{note.staffId}</h3>
              <span className="text-sm text-gray-500">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
          </div>
        ))}

        {notes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No CV notes found
          </div>
        )}
      </div>
    </div>
  );
}


