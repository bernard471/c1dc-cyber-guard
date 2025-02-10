"use client"

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import Link from 'next/link'

export default function HelpCenter() {
  const helpSections = [
    {
      title: "Getting Started",
      icon: "🚀",
      steps: [
        {
          heading: "Create Your Account",
          content: "Sign up using your email address or Google account. A verified account helps us better assist you and track your reports.",
          tips: ["Use a strong password", "Verify your email address", "Keep your login credentials secure"]
        },
        {
          heading: "Navigating the Dashboard",
          content: "Use the sidebar menu to access different sections of the platform. The main navigation includes Home, Dashboard, Report Crimes, My Reports, Messages, and Resources.",
          tips: ["Click menu items to expand sub-sections", "Use the mobile menu toggle on smaller screens"]
        }
      ]
    },
    {
      title: "Reporting a Cybercrime",
      icon: "🛡️",
      steps: [
        {
          heading: "Select Crime Type",
          content: "Choose from various cybercrime categories including Momo Fraud, WhatsApp Hacks, Social Account Hacks, Sextortion/Blackmail, and more.",
          tips: ["Be specific about the incident type", "Select the most relevant category"]
        },
        {
          heading: "Submit Your Report",
          content: "Provide detailed information about the incident. Include relevant screenshots, messages, or any evidence that might help investigate the case.",
          tips: ["Be thorough in your description", "Include all relevant dates and times", "Attach supporting documents"]
        },
        {
          heading: "Track Your Case",
          content: "Monitor your report status through the My Reports section. You'll receive updates and can communicate with investigators through the Messages feature.",
          tips: ["Keep your case number handy", "Check regularly for updates", "Respond promptly to inquiries"]
        }
      ]
    }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
          <p className="text-gray-600">Learn how to use CyberGuard to report and track cybercrime incidents</p>
        </div>

        {helpSections.map((section, index) => (
          <div key={index} className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-2xl mr-2">{section.icon}</span>
              <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
            </div>

            <div className="space-y-8">
              {section.steps.map((step, stepIndex) => (
                <div 
                  key={stepIndex}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-medium text-[#0466c8] mb-3">{step.heading}</h3>
                  <p className="text-gray-600 mb-4">{step.content}</p>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Pro Tips:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-gray-600 text-sm">{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Need Additional Help?</h2>
          <p className="text-gray-600 mb-4">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex space-x-4">
          <Link 
            href="/pages/support/contact-us" 
            className="bg-[#0466c8] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Contact Support
          </Link>
            <Link  
            href="/pages/support/faq"
            className="bg-white text-[#0466c8] px-4 py-2 rounded-md border border-[#0466c8] hover:bg-blue-50 transition-colors">
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
