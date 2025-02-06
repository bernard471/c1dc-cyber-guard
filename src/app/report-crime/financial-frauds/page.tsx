"use client"

import { FinancialFraudForm } from '@/components/crime-forms/FinanceFraudForm'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function FinancialFraudReportPage() {
  const [activeTab, setActiveTab] = useState('finance-fraud');
  const [formData, setFormData] = useState({
    fraudType: '',
    bankDetails: {
      bankName: '',
      accountType: ''
    },
    dateDiscovered: '',
    description: '',
    fraudsterDetails: {
      suspectedPerpetrator: '',
      fraudsterAccount: '',
      communicationMethod: ''
    },
    evidenceFiles: [] as File[],
    transactionDetails: {
      amountLost: 0,
      details: ''
    },
    fraudIndicators: {
      accountCompromised: false,
      cardCompromised: false,
      checkFraud: false,
      loanFraud: false,
      transferFraud: false
    },
    recoveryStatus: {
      recoveryAttempted: false,
      recoveryAmount: 0,
      bankResponse: ''
    },
    actionsStatus: {
      bankInformed: false,
      policeReported: false
    },
    actionsTaken: '',
    affectedServices: [] as string[],
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
            <h1 className="text-3xl font-bold text-gray-900">Report Financial Fraud 💸</h1>
            <p className="mt-2 text-gray-600">
              Help us combat financial fraud by reporting suspicious transactions and activities
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6">
              <FinancialFraudForm 
                formData={formData} 
                setFormData={setFormData}
              />
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your report strengthens our financial security measures</p>
          </div>
        </div>
      </div>
    </div>
  )
}
