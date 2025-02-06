"use client"

import { OtherFraudForm } from '@/components/crime-forms/OtherFraudForm'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function OtherFraudReportPage() {
  const [activeTab, setActiveTab] = useState('other-fraud');
  const [formData, setFormData] = useState({
    fraudCategory: '',
    dateOfIncident: '',
    description: '',
    methodDetails: {
      methodUsed: '',
      platformUsed: '',
      fraudTechniques: [] as string[]
    },
    perpetratorDetails: {
      name: '',
      contactMethod: '',
      otherDetails: ''
    },
    evidenceFiles: [] as File[],
    impactDetails: {
      amountLost: 0,
      victimImpact: '',
      otherVictims: false
    },
    preventiveMeasures: {
      actionsTaken: '',
      preventiveSuggestions: '',
      additionalDetails: ''
    },
    actionsStatus: {
      policeReported: false
    },
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
            <h1 className="text-3xl font-bold text-gray-900">Report Other Fraud Type 🚨</h1>
            <p className="mt-2 text-gray-600">
              Report any type of fraud that doesn&apos;t fit into other categories
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6">
              <OtherFraudForm 
                formData={formData} 
                setFormData={setFormData}
              />
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Every report helps us identify and combat new types of fraud</p>
          </div>
        </div>
      </div>
    </div>
  )
}
