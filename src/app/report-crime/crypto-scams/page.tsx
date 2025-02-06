"use client"

import { CryptoScamForm } from '@/components/crime-forms/CryptoScamForm'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function CryptoScamReportPage() {
  const [activeTab, setActiveTab] = useState('crypto-scam');
  const [formData, setFormData] = useState({
    scamType: '',
    dateOfIncident: '',
    description: '',
    platformUsed: '',
    cryptoType: '',
    scammerDetails: {
      name: '',
      platform: '',
      contactInfo: '',
      walletAddress: '',
      otherDetails: ''
    },
    evidenceFiles: [] as File[],
    transactionDetails: {
      amountLost: 0,
      investmentPromised: 0,
      websiteURL: '',
      communicationMethod: ''
    },
    scamIndicators: {
      fakeWebsite: false,
      fakeInvestment: false,
      ponziScheme: false,
      miningScam: false,
      walletCompromised: false,
      exchangeCompromised: false
    },
    actionsStatus: {
      bankInformed: false,
      policeReported: false
    },
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
            <h1 className="text-3xl font-bold text-gray-900">Report Cryptocurrency Scam ₿</h1>
            <p className="mt-2 text-gray-600">
              Help us track and prevent cryptocurrency fraud by reporting your incident
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6">
              <CryptoScamForm 
                formData={formData} 
                setFormData={setFormData}
              />
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Together we can make cryptocurrency trading safer for everyone</p>
          </div>
        </div>
      </div>
    </div>
  )
}
