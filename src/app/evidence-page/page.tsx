'use client';

import { EvidenceUpload } from '@/components/crime-forms/EvidenceUpload';
import { ArrowLeft, Bell, UserCircle } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

export default function EvidencePage() {
  const [activeTab, setActiveTab] = useState('evidence');

  const handleUploadComplete = (fileData: {
    fileName: string;
    fileUrl: string;
    uploadDate: Date;
  }) => {
    console.log('Upload completed:', fileData);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm md:w-[calc(100%-280px)] md:fixed top-0 pl-10 right-0 md:z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Evidence Management 🔍</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <UserCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-6 md:mt-16">
          <div className="mb-8">
            <Link 
              href="/dashboard" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Upload Case Evidence</h1>
            <p className="mt-2 text-gray-600">
              Submit evidence files related to your case report. Supported formats include images and documents.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6">
              <EvidenceUpload onUploadComplete={handleUploadComplete} />
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>All evidence uploads are encrypted and handled with strict confidentiality</p>
          </div>
        </div>
      </div>
    </div>
  );
}
