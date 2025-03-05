"use client";

import { useState } from 'react';

interface DocumentPreviewProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentPreview({ url, isOpen, onClose }: DocumentPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  const getEmbedUrl = (driveUrl: string) => {
    const fileId = driveUrl.match(/[-\w]{25,}/);
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId[0]}/preview`;
    }
    return driveUrl;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="relative w-[95%] h-[90vh] bg-white rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 focus:outline-none shadow-lg"
        >
          ×
        </button>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading document...</p>
            </div>
          </div>
        )}

        <iframe
          src={getEmbedUrl(url)}
          className="w-full h-full rounded-lg"
          title="Document Preview"
          allow="autoplay"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
} 