import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface EvidenceUploadProps {
  onUploadComplete: (fileData: {
    fileName: string;
    fileUrl: string;
    uploadDate: Date;
  }) => void;
  identifier?: {
    type: 'reportId' | 'caseNumber';
    value: string;
  };
}

export const EvidenceUpload = ({ onUploadComplete, identifier }: EvidenceUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [reportId, setReportId] = useState(identifier?.type === 'reportId' ? identifier.value : '');
  const [caseNumber, setCaseNumber] = useState(identifier?.type === 'caseNumber' ? identifier.value : '');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileUpload = async (file: File) => {
    if (!reportId.trim() && !caseNumber.trim()) {
      alert('Please enter either a Report ID or Case Number');
      return;
    }

    const formData = new FormData();
    if (reportId) formData.append('reportId', reportId);
    if (caseNumber) formData.append('caseNumber', caseNumber);
    formData.append('files', file);


    try {
      const response = await fetch('/api/upload-evidence', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        onUploadComplete(data.data);
        setSelectedFiles(prev => prev.filter(f => f !== file));
        
        // If this was the last file, show success popup
        if (selectedFiles.length === 1) {
          setShowSuccessPopup(true);
          setTimeout(() => setShowSuccessPopup(false), 3000); // Hide after 3 seconds
        }
      }
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  const removeFile = (fileToRemove: File) => {
    setSelectedFiles(prev => prev.filter(file => file !== fileToRemove));
  };

  return (
    <div className="relative">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in-out">
          <p className="flex items-center">
            <span className="mr-2">✓</span>
            All evidence uploaded successfully!
          </p>
        </div>
      )}
      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {identifier?.type === 'caseNumber' ? 'Case Number' : 'Report ID'}
      </label>
      <input
        type="text"
        value={identifier?.type === 'caseNumber' ? caseNumber : reportId}
        onChange={(e) => {
          if (identifier?.type === 'caseNumber') {
            setCaseNumber(e.target.value);
          } else {
            setReportId(e.target.value);
          }
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enter your ${identifier?.type === 'caseNumber' ? 'case number' : 'report ID'}`}
        required
      />
    </div>


      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Evidence
      </label>
      <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="flex justify-center">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500">
                <span>Upload transaction screenshots</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <Image
                  src={URL.createObjectURL(file)} 
                  alt={file.name} 
                  className="object-cover rounded"
                  width={40}
                  height={40}
                />
                <span className="text-sm text-gray-500">{file.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleFileUpload(file)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
