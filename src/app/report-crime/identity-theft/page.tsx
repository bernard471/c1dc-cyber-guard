"use client"

import { IdentityTheftForm } from '@/components/crime-forms/IdentityTheftForm'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function IdentityTheftReportPage() {
  const [activeTab, setActiveTab] = useState('identity-theft');
  const [formData, setFormData] = useState({
    typeOfTheft: '',
    dateDiscovered: '',
    description: '',
    suspectedMethod: '',
    suspectedPerpetrator: '',
    documentsCompromised: [] as {
      documentType: string;
      dateCompromised: string;
      details: string;
    }[],
    evidenceFiles: [] as File[],
    accountsAffected: [] as {
      accountType: string;
      institution: string;
      dateAffected: string;
    }[],
    creditCardsFraud: false,
    bankAccountsFraud: false,
    loansCreated: false,
    governmentDocuments: false,
    socialMediaImpersonation: false,
    businessImpersonation: false,
    financialLoss: 0,
    policeReported: false,
    creditBureauNotified: false,
    bankNotified: false,
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
            <h1 className="text-3xl font-bold text-gray-900">Report Identity Theft 🎭</h1>
            <p className="mt-2 text-gray-600">
              Please provide details about the identity theft incident to help us investigate
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6">
              <IdentityTheftForm 
                formData={formData} 
                setFormData={setFormData}
              />
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>We take identity theft seriously and will handle your case with utmost confidentiality</p>
          </div>
        </div>
      </div>
    </div>
  )
}
