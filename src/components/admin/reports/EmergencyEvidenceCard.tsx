import React, { useState } from 'react';
import Image from 'next/image';
import { Download, X } from 'lucide-react';

interface EmergencyEvidenceCardProps {
  evidence: {
    files: Array<{
      fileName: string;
      fileData: string;
      fileType: string;
      uploadDate: string;
    }>;
  };
}

export const EmergencyEvidenceCard = ({ evidence }: EmergencyEvidenceCardProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {evidence.files.map((file, index) => (
            <div key={index} className="relative group">
              <div 
                className="relative aspect-video rounded-lg overflow-hidden border border-gray-200"
                onClick={() => setSelectedImage(file.fileData)}
              >
                <Image
                  src={file.fileData}
                  alt={file.fileName}
                  className=" object-cover"
                  width={60}
                height={60}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(file.fileData, file.fileName);
                    }}
                    className="text-white text-sm bg-black/50 px-3 py-1.5 rounded-full flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">{file.fileName}</p>
            </div>
          ))}
        </div>
      </div>

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
                className=" object-contain p-4"
                
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
