import React, { useState } from 'react';
import Image from 'next/image';
import { Download, X } from 'lucide-react';

interface EvidenceCardProps {
  evidence: {
    reportId: string;
    files: Array<{
      fileName: string;
      fileData: string;
      fileType: string;
      uploadDate: string;
    }>;
    status: string;
    description?: string;
  };
}

export const EvidenceCard = ({ evidence }: EvidenceCardProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
    if (!evidence.files || evidence.files.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 className="text-md font-semibold mb-2">Report ID: {evidence.reportId}</h3>
          <div className="text-center py-4 text-gray-500">
            No files attached to this evidence
          </div>
        </div>
      );
    }

  const handleDownload = (fileData: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-md font-semibold mb-2">Report ID: {evidence.reportId}</h3>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
          {evidence.files.map((file, index) => (
            <div key={index} className="relative group">
              <div 
                className=" relative rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(file.fileData)}
              >
                <Image
                  src={file.fileData}
                  alt={file.fileName}
                  className="object-cover rounded"
                  width={40}
                  height={40}
                />
              </div>
              <button
                onClick={() => handleDownload(file.fileData, file.fileName)}
                className="absolute bottom-1 right-1 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Download className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
        
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full h-[80vh] bg-white rounded-lg">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-2 top-2 p-2 bg-white rounded-full shadow-md z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Evidence"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
