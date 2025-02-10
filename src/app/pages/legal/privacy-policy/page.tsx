"use client"

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { Shield, Lock, Database, UserCheck, Bell, Scale } from 'lucide-react'

export default function PrivacyPolicy() {
  const policySections = [
    {
      icon: <Shield className="w-6 h-6 text-[#0466c8]" />,
      title: "Information We Collect",
      content: [
        {
          heading: "Personal Information",
          details: [
            "Full name and contact details",
            "Email address and phone number",
            "National identification numbers (when required for verification)",
            "IP address and device information",
            "Location data (with consent)",
            "Communication preferences"
          ]
        },
        {
          heading: "Crime Report Data",
          details: [
            "Incident details and descriptions",
            "Date and time of incidents",
            "Supporting evidence and documentation",
            "Transaction records and financial information related to cybercrimes",
            "Communication records with perpetrators",
            "Witness statements and contact information"
          ]
        }
      ]
    },
    {
      icon: <Database className="w-6 h-6 text-[#0466c8]" />,
      title: "How We Use Your Information",
      content: [
        {
          heading: "Primary Purposes",
          details: [
            "Processing and investigating cybercrime reports",
            "Communicating with law enforcement agencies",
            "Providing case updates and notifications",
            "Analyzing crime patterns and trends",
            "Improving our security measures and services",
            "Verifying user identity and preventing fraud"
          ]
        }
      ]
    },
    {
      icon: <Lock className="w-6 h-6 text-[#0466c8]" />,
      title: "Data Security",
      content: [
        {
          heading: "Security Measures",
          details: [
            "End-to-end encryption for sensitive data",
            "Regular security audits and assessments",
            "Secure data centers with 24/7 monitoring",
            "Access controls and authentication protocols",
            "Regular backup and disaster recovery procedures",
            "Employee training on data protection"
          ]
        }
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6 text-[#0466c8]" />,
      title: "Data Sharing",
      content: [
        {
          heading: "Authorized Recipients",
          details: [
            "Law enforcement agencies",
            "Legal authorities and courts",
            "Cybersecurity partners and experts",
            "Financial institutions (for fraud cases)",
            "Emergency services when required"
          ]
        }
      ]
    },
    {
      icon: <Bell className="w-6 h-6 text-[#0466c8]" />,
      title: "Your Rights",
      content: [
        {
          heading: "User Rights",
          details: [
            "Access your personal information",
            "Request data correction or deletion",
            "Opt-out of non-essential communications",
            "Request data portability",
            "Lodge complaints with supervisory authorities",
            "Withdraw consent for data processing"
          ]
        }
      ]
    },
    {
      icon: <Scale className="w-6 h-6 text-[#0466c8]" />,
      title: "Legal Basis",
      content: [
        {
          heading: "Processing Grounds",
          details: [
            "Consent for data collection and processing",
            "Legal obligations for crime reporting",
            "Legitimate interests in preventing cybercrime",
            "Public interest in maintaining cybersecurity",
            "Contractual necessity for service provision"
          ]
        }
      ]
    }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-blue-100  border-l-4 border-blue-400 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
          <p className="text-gray-700">
            CyberGuard is committed to protecting your privacy and ensuring the security of your personal information. 
            This policy outlines our practices for collecting, using, and safeguarding your data in accordance with 
            applicable data protection laws and regulations.
          </p>
        </div>

        <div className="space-y-8">
          {policySections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm  border-t-4 border-green-400  p-6">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-50 rounded-lg mr-4">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              </div>

              {section.content.map((subsection, subIndex) => (
                <div key={subIndex} className="mb-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">{subsection.heading}</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {subsection.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-gray-600 ml-4">{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-50  border-l-4 border-red-400 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Our Data Protection Officer</h2>
          <p className="text-gray-600 mb-4">
            For privacy-related inquiries or to exercise your data rights, contact our Data Protection Officer at:
          </p>
          <div className="text-[#0466c8]">
            <p>Email: info@cyber1defense.com</p>
            <p>Phone: +233 (0) 552 373 603</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
