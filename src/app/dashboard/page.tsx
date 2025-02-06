"use client"

import React, { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Sidebar from '@/components/Sidebar';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';
import RecentReports from '@/components/RecentReports';

const CybercrimePlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const crimeCategories = [
    { id: 'momo', name: 'Mobile Money Fraud', icon: '💰', path: '/report-crime/momo-fraud' },
    { id: 'whatsapp', name: 'WhatsApp Hacks', icon: '💬', path: '/report-crime/whatsapp-hacks' },
    { id: 'social', name: 'Social Media Hacks', icon: '📱', path: '/report-crime/social-account-hacks' },
    { id: 'sextortion', name: 'Sextortion and Blackmail', icon: '⚠️', path: '/report-crime/sextortion-and-blackmail' },
    { id: 'email', name: 'Email Hacks', icon: '📧', path: '/report-crime/email-hacks' },
    { id: 'stalking', name: 'Location Tracking/Stalking', icon: '🎯', path: '/report-crime/stalking' }
  ];
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
      <DashboardHeader />

        <main className="p-6">
          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/report-crime" 
              className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center"
            >
              Report New Crime 
            </Link>
              <Link
              href ="/resources/education-resources" 
              className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-center">
                Educational resources
              </Link>
              <Link 
               href ="/resources/emergency-support"
              className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-center">
                Emergency Support
              </Link>
            </div>
          </div>

          {/* Crime Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Report by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {crimeCategories.map((category) => (
                <Link
                  key={category.id}
                  href={category.path}
                  className="p-4 bg-white text-center rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm text-gray-600">{category.name}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Reports</h3>
            <RecentReports />
          </div>

          {/* Emergency Alert */}
          <Alert className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Emergency Support Available</AlertTitle>
            <AlertDescription>
              If you&apos;re in immediate danger or facing a critical cybercrime situation, 
              contact our 24/7 emergency support line at +233 55 237 3603
            </AlertDescription>
          </Alert>
        </main>
      </div>
    </div>
  );
};

export default CybercrimePlatform;
