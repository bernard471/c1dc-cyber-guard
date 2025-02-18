"use client"

import { LocationTrackingForm } from '@/components/crime-forms/LocationTrackingForm'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'



const DisclaimerSection = () => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-8 mx-auto max-w-6xl my-12">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-800">Important Notice for Stalking Victims</h3>
          <div className="mt-2 text-red-700">
            <p className="mb-2">While Cyber1Defense Communications is committed to cybersecurity and victim support, we strongly advise all stalking victims to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Contact local law enforcement immediately</li>
              <li>File an official police report before submitting details to our platform</li>
              <li>Keep all evidence and documentation of incidents</li>
            </ul>
            <p className="mt-4">Your safety is paramount. Our platform serves as an additional resource, not a replacement for law enforcement intervention.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LocationTrackingReportPage() {
  const [activeTab, setActiveTab] = useState('location-tracking');
  const [formData, setFormData] = useState({
    trackingMethod: '',
    dateDiscovered: '',
    duration: '',
    description: '',
    suspectedPerpetrator: '',
    locationAffected: '',
    evidenceFiles: [] as File[],
    devicesAffected: [] as {
      deviceType: string;
      deviceName: string;
      affectedDate: string;
    }[],
    physicalStalking: false,
    onlineStalking: false,
    threatsReceived: false,
    policeReported: false,
    restrainingOrder: false,
    financialLoss: 0,
    safetyMeasures: '',
    isAnonymous: false,
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      contactPreference: 'email' as 'email' | 'phone' | 'whatsapp'
    }
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-8">
            <Link 
              href="/dashboard" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Report Location Tracking 📍</h1>
            <p className="mt-2 text-gray-600">
              Please provide details about the location tracking or stalking incident
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6">
              <LocationTrackingForm 
                formData={formData} 
                setFormData={setFormData}
              />
            </div>
          </div>
          <DisclaimerSection />
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your safety is our priority - all reports are handled confidentially</p>
          </div>
        </div>
      </div>
    </div>
  )
}
