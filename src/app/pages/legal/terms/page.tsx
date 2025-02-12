"use client"

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { FileText, Shield, Scale, Clock, AlertTriangle, UserCheck, Lock } from 'lucide-react'

export default function Terms() {
  const termsContent = [
    {
      icon: <FileText className="w-6 h-6 text-[#0466c8]" />,
      title: "Agreement to Terms",
      content: `By accessing and using CyberGuard's services, you agree to be bound by these Terms of Service. These terms govern your use of our platform, including all features, functionalities, and user interfaces.`,
      subPoints: [
        "Users must be at least 18 years old",
        "Valid identification required for account creation",
        "Acceptance of electronic communications",
        "Compliance with all applicable laws and regulations"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-[#0466c8]" />,
      title: "Service Description",
      content: "CyberGuard provides a platform for reporting and tracking cybercrime incidents.",
      subPoints: [
        "24/7 cybercrime reporting system",
        "Case management and tracking",
        "Communication with relevant authorities",
        "Evidence submission and storage",
        "Real-time status updates",
        "Resource center access"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6 text-[#0466c8]" />,
      title: "User Responsibilities",
      content: "Users of CyberGuard platform agree to:",
      subPoints: [
        "Provide accurate and truthful information",
        "Maintain account security and confidentiality",
        "Report unauthorized account access",
        "Not misuse or abuse the platform",
        "Respect other users' privacy",
        "Comply with platform guidelines"
      ]
    },
    {
      icon: <Lock className="w-6 h-6 text-[#0466c8]" />,
      title: "Data Usage and Privacy",
      content: "Your data is protected under our Privacy Policy and used for:",
      subPoints: [
        "Crime investigation and reporting",
        "Law enforcement collaboration",
        "Service improvement",
        "Statistical analysis",
        "User support and communication",
        "Legal compliance"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-[#0466c8]" />,
      title: "Prohibited Activities",
      content: "The following activities are strictly prohibited:",
      subPoints: [
        "False or misleading reports",
        "Harassment or abuse",
        "Unauthorized access attempts",
        "Distribution of malware",
        "Interference with platform operations",
        "Commercial exploitation without permission"
      ]
    },
    {
      icon: <Scale className="w-6 h-6 text-[#0466c8]" />,
      title: "Legal Compliance",
      content: "CyberGuard operates under the following legal framework:",
      subPoints: [
        "Cybersecurity Act compliance",
        "Data protection regulations",
        "Law enforcement cooperation protocols",
        "International cybercrime treaties",
        "Digital evidence handling standards"
      ]
    },
    {
      icon: <Clock className="w-6 h-6 text-[#0466c8]" />,
      title: "Service Modifications",
      content: "CyberGuard reserves the right to:",
      subPoints: [
        "Modify or discontinue services",
        "Update terms and conditions",
        "Adjust feature availability",
        "Change pricing (if applicable)",
        "Implement new security measures"
      ]
    }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to CyberGuard</h2>
        <p className="text-gray-700">
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and CyberGuard 
            regarding your use of our cybercrime reporting and tracking services.
          </p>
        </div>

        <div className="space-y-8">
          {termsContent.map((section, index) => (
             <div key={index} className="bg-white rounded-lg shadow-sm border-t-4 border-purple-400 p-6">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-50 rounded-lg mr-4">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              </div>

              <p className="text-gray-700 mb-4">{section.content}</p>

              <ul className="space-y-2">
                {section.subPoints.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-50 border-l-4 border-amber-400 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-600 mb-4">
            For legal inquiries or questions about these Terms of Service, contact our legal department at:
          </p>
          <div className="text-[#0466c8]">
            <p>Email: c1dcreports@gmail.com</p>
            <p>Phone: +233 (0) 552 373 603</p>
            <p>Address: info@cyber1defense.com</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
