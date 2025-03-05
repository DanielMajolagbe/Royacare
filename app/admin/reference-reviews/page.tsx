"use client";

import { useEffect, useState } from 'react';

interface ReferenceReview {
  id: string;
  staffId: string;
  reviewerName: string;
  reviewDate: string;
  status: string;
}

export default function ReferenceReviews() {
  const [reviews, setReviews] = useState<ReferenceReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/staff/referees');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0F1531]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Reference Reviews</h1>
      <div className="grid gap-4">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="border rounded-lg p-4 bg-white shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{review.staffId}</h3>
                <p className="text-sm text-gray-600">Reviewer: {review.reviewerName}</p>
                <p className="text-sm text-gray-600">Date: {review.reviewDate}</p>
                <p className={`text-sm ${
                  review.status === 'pending' ? 'text-yellow-600' : 
                  review.status === 'approved' ? 'text-green-600' : 'text-red-600'
                }`}>
                  Status: {review.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 