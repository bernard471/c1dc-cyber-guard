"use client"

import { ShoppingScamForm } from '@/components/crime-forms/ShoppingScamForm'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function ShoppingScamReportPage() {
  const [activeTab, setActiveTab] = useState('shopping-scam');
  const [formData, setFormData] = useState({
    platformUsed: '',
    dateOfIncident: '',
    description: '',
    scammerDetails: {
      name: '',
      phone: '',
      email: '',
      socialMedia: '',
      otherDetails: ''
    },
    productType: '',
    paymentMethod: '',
    evidenceFiles: [] as File[],
    orderDetails: {
      orderNumber: '',
      amountLost: 0,
      websiteURL: '',
      sellerContact: '',
      deliveryPromised: ''
    },
    scamIndicators: {
      fakeWebsite: false,
      fakeProduct: false,
      nonDelivery: false
    },
    actionsStatus: {
      bankInformed: false,
      policeReported: false,
      productReceived: false
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
            <h1 className="text-3xl font-bold text-gray-900">Report Shopping Scam 🛍️</h1>
            <p className="mt-2 text-gray-600">
              Help us combat online shopping fraud by reporting your experience
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6">
              <ShoppingScamForm 
                formData={formData} 
                setFormData={setFormData}
              />
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your report helps protect others from similar scams</p>
          </div>
        </div>
      </div>
    </div>
  )
}
