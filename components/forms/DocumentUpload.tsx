"use client";

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentType } from '@/lib/types/document.types';
import { MdRemoveRedEye } from 'react-icons/md';

interface UploadedFile {
  url: string;
  name: string;
  type: string;
  timestamp: Date;
}

interface Props {
  staffId: string;
  stage: number;
  documentType: DocumentType;
  onUploadSuccess: () => void;
  existingDocument?: any;
}

const DocumentUpload = ({ staffId, stage, documentType, onUploadSuccess }: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // Fetch existing documents on component mount
  useEffect(() => {
    const fetchExistingDocuments = async () => {
      try {
        const response = await fetch(`/api/staff/documents?staffId=${staffId}&documentType=${documentType}`);
        if (response.ok) {
          const data = await response.json();
          // Filter documents by documentType
          const relevantDocs = data.documents.filter((doc: any) => doc.type === documentType);
          const existingFiles = relevantDocs.map((doc: any) => ({
            url: doc.url,
            name: doc.name || 'Document',
            type: doc.type || 'application/pdf',
            timestamp: new Date(doc.createdAt || Date.now())
          }));
          setUploadedFiles(existingFiles);
        }
      } catch (error) {
        console.error('Error fetching existing documents:', error);
      }
    };

    fetchExistingDocuments();
  }, [staffId, documentType]);

  const validatePassportPhoto = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        const tolerance = 5;
        const targetWidth = 317;
        const targetHeight = 435;
        const withinTolerance = (actual: number, target: number) => 
          Math.abs(actual - target) <= tolerance;

        if (withinTolerance(img.width, targetWidth) && withinTolerance(img.height, targetHeight)) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
    });
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setError('');

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB. Please compress your file.');
      return;
    }

    if (documentType === DocumentType.PASSPORT_PHOTO) {
      if (!file.type.includes('jpeg')) {
        setError('Please upload a JPEG format image only');
        return;
      }

      const isValidSize = await validatePassportPhoto(file);
      if (!isValidSize) {
        setError('Image must be exactly 317x435 pixels (±5px). Please resize your image at https://www.iloveimg.com/resize-image#resize-options,pixels');
        return;
      }
    }

    try {
      setIsUploading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('staffId', staffId);
      formData.append('stage', stage.toString());
      formData.append('documentType', documentType);
      formData.append('mimeType', file.type);

      const response = await fetch('/api/staff/documents', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      // Add the new file to the UI immediately
      const newFile = {
        url: data.url,
        name: file.name,
        type: file.type,
        timestamp: new Date()
      };

      setUploadedFiles(prev => [newFile, ...prev]);

      // Trigger a refetch of all documents to ensure UI is in sync
      const refetchResponse = await fetch(`/api/staff/documents?staffId=${staffId}&documentType=${documentType}`);
      if (refetchResponse.ok) {
        const refetchData = await refetchResponse.json();
        const relevantDocs = refetchData.documents.filter((doc: any) => doc.type === documentType);
        const existingFiles = relevantDocs.map((doc: any) => ({
          url: doc.url,
          name: doc.name || 'Document',
          type: doc.type || 'application/pdf',
          timestamp: new Date(doc.createdAt || Date.now())
        }));
        setUploadedFiles(existingFiles);
      }

      // Call the success callback
      onUploadSuccess();
    } catch (err) {
      setError('Failed to upload file. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: documentType === DocumentType.PASSPORT_PHOTO 
      ? { 'image/jpeg': ['.jpg', '.jpeg'] }
      : documentType === DocumentType.CV
        ? { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }
        : {
            'image/*': ['.jpeg', '.jpg', '.png'],
            'application/pdf': ['.pdf']
          }
  });

  const viewDocument = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${isUploading ? 'cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={isUploading} />
        {isUploading ? (
          <p>Uploading...</p>
        ) : isDragActive ? (
          <p>Drop the file here</p>
        ) : (
          <p>Drag & drop a file here, or click to select</p>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center mt-2">
          {error}
        </div>
      )}

      {/* Upload History */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="bg-transparent border border-black text-green-700 px-4 py-3 rounded relative">
          <div className="flex items-center justify-between">
            <span className="block sm:inline">File uploaded successfully! Kindly see all submissions at the bottom of the page</span>
            <button
                  onClick={() => viewDocument(file.url)}
              className="flex items-center text-green-700 hover:text-green-900"
            >
              <MdRemoveRedEye className="mr-1" />
              View Document
            </button>
          </div>
          <div className="text-sm mt-1 text-green-600">
                {file.name} - {new Date(file.timestamp).toLocaleString()}
              </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
