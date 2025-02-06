"use client"

import React, { useState } from 'react';

import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';

const CrimeReportForm = () => {
  const [selectedCrime, setSelectedCrime] = useState('');
  const [activeTab, setActiveTab] = useState('report');
  const router = useRouter();

  const crimeTypes = [
    { name: 'Momo Fraud', icon: '💰', id: 'momo-fraud', path: '/report-crime/momo-fraud' },
    { name: 'WhatsApp Hacks', icon: '💬', id: 'cyber-bullying', path: '/report-crime/whatsapp-hacks' },
    { name: 'Social Accounts Hacks', icon: '📱', id: 'social-account-hacks', path: '/report-crime/social-account-hacks' },
    { name: 'Sextortion/Blackmail', icon: '⚠️', id:'sextortion', path: '/report-crime/sextortion-and-blackmail' },
    { name: 'Email Hacks', icon: '📧', id: 'email-hacks', path: '/report-crime/email-hacks' },
    { name: 'Tracking/Stalking', icon: '🎯', id: 'stalking', path: '/report-crime/stalking' },
    { name: 'Identity Theft', icon: '🎭', id: 'identity-theft', path: '/report-crime/identity-theft' },
    { name: 'Shopping Scams', icon: '🛍️', id:'shopping', path: '/report-crime/shopping-scams' },
    { name: 'Cryptocurrency Scams', icon: '₿', id: 'crypto', path: '/report-crime/crypto-scams' },
    { name: 'Employment Scams', icon: '💼', id: 'employment', path: '/report-crime/employment-scams' },
    { name: 'Financial Frauds', icon: '💸', id: 'finance', path: '/report-crime/financial-frauds' },
    { name: 'Other Fraud Activities', icon: '🚨', id: 'other', path: '/report-crime/other-fraudulent-activities' },
  ];

  const handleCrimeSelection = (crimeType: typeof crimeTypes[0]) => {
    setSelectedCrime(crimeType.id);
    router.push(crimeType.path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
      <DashboardHeader />

      
        <main className="p-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Report A Cybercrime</h2>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {crimeTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleCrimeSelection(type)}
                  className={`p-4 rounded-lg border-4 transition-all bg-blue-50 hover:bg-blue-200 ${
                    selectedCrime === type.id ? 'border-blue-500 bg-blue-100' : 'border-gray-200'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-sm font-medium text-center">{type.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CrimeReportForm;
