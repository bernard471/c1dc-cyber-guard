"use client"

import { EmploymentScamForm } from '@/components/crime-forms/EmploymentScamForm'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function EmploymentScamReportPage() {
  const [activeTab, setActiveTab] = useState('employment-scam');
  const [formData, setFormData] = useState({
    scamType: '',
    dateOfIncident: '',
    description: '',
    companyDetails: {
      companyName: '',
      jobTitle: '',
      websiteURL: '',
      jobPostingPlatform: '',
      promisedSalary: 0
    },
    scammerDetails: {
      name: '',
      email: '',
      phone: '',
      position: '',
      otherDetails: ''
    },
    evidenceFiles: [] as File[],
    documentsSubmitted: [] as {
      documentType: string;
      submissionDate: string;
      details: string;
    }[],
    financialDetails: {
      amountLost: 0,
      recruitmentFees: 0,
      paymentMethod: ''
    },
    scamIndicators: {
      interviewConducted: false,
      paymentRequested: false,
      documentsRequested: false,
      personalInfoShared: false,
      bankDetailsShared: false,
      contractReceived: false
    },
    communicationMethod: '',
    policeReported: false,
    actionsTaken: '',
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
            <h1 className="text-3xl font-bold text-gray-900">Report Employment Scam 💼</h1>
            <p className="mt-2 text-gray-600">
              Help protect job seekers by reporting fraudulent employment schemes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6">
              <EmploymentScamForm 
                formData={formData} 
                setFormData={setFormData}
              />
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your report helps create a safer job market for everyone</p>
          </div>
        </div>
      </div>
    </div>
  )
}
