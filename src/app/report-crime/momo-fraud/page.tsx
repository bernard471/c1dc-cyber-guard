"use client"

import { MomoFraud } from '@/components/crime-forms/Momo-Fraud'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function MomoFraudReportPage() {
  const [activeTab, setActiveTab] = useState('momo-fraud');
  const [formData, setFormData] = useState({
    momoNumber: '',
    transactionId: '',
    provider: '',
    amount: '',
    dateOfTransaction: '',
    description: '',
    evidenceFiles: [] as File[],
    fraudsterNumber: '',
    fraudsterName: '',
    isAnonymous: false,
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      contactPreference: 'email' as 'email' | 'phone' | 'whatsapp'
    }
  })

  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
    {/* Main Content */}
    <div className="flex-1 overflow-auto">
    <DashboardHeader />
      <div className="max-w-6xl mx-auto p-6 ">
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Report Mobile Money Fraud 💰</h1>
          <p className="mt-2 text-gray-600">
            Please provide accurate information about the mobile money fraud incident
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6">
            <MomoFraud 
              formData={formData} 
              setFormData={setFormData}
            />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your report will be handled with strict confidentiality</p>
        </div>
      </div>
    </div>
    </div>
  )
}
