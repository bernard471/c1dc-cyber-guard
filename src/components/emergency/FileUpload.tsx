import React, { useState, useCallback } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FileUploadProps {
  onUploadComplete: (fileData: {
    fileName: string;
    fileUrl: string;
    uploadDate: Date;
    fileType: string;
    fileData: string;
  }) => void;
}

export const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ACCEPTED_FILE_TYPES = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/heic': ['.heic'],
    'application/pdf': ['.pdf']
  };

// Update onDrop in FileUpload.tsx
const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });
  
    setSelectedFiles(prev => [...prev, ...validFiles]);
    setUploadError(null);
  
    validFiles.forEach(file => {
      const fileUrl = URL.createObjectURL(file);
      onUploadComplete({
        fileName: file.name,
        fileUrl: fileUrl,
        uploadDate: new Date(),
        fileType: file.type,
        fileData: fileUrl
      });
    });
  }, [onUploadComplete]);
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE
  });

  const removeFile = (fileToRemove: File) => {
    setSelectedFiles(prev => prev.filter(file => file !== fileToRemove));
    setUploadError(null);
  };

  return (
    <div className="relative">
      {uploadError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}

      <div
        {...getRootProps()}
        className={`mt-1 border-2 border-dashed rounded-lg p-6 transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          cursor-pointer`}
      >
        <div className="flex justify-center">
          <div className="space-y-1 text-center">
            <Upload className={`mx-auto h-12 w-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
            <div className="flex text-sm text-gray-600">
              <input {...getInputProps()} />
              <p className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                {isDragActive ? 
                  'Drop files here' : 
                  'Drag and drop files or click to upload'
                }
              </p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, HEIC, PDF up to 10MB
            </p>
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                {file.type.startsWith('image/') ? (
                  <Image
                    src={URL.createObjectURL(file)} 
                    alt={file.name} 
                    className="object-cover rounded"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600">{file.name.split('.').pop()?.toUpperCase()}</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(file)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
