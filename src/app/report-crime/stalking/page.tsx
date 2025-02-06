"use client"

import { LocationTrackingForm } from '@/components/crime-forms/LocationTrackingForm'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'

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

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your safety is our priority - all reports are handled confidentially</p>
          </div>
        </div>
      </div>
    </div>
  )
}
