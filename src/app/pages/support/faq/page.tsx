"use client"

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqCategories = [
    {
      category: "Reporting Process",
      icon: "🛡️",
      questions: [
        {
          q: "How quickly will my cybercrime report be processed?",
          a: "Reports are typically processed within 24-48 hours. High-priority cases involving active financial fraud or immediate threats are escalated for faster response."
        },
        {
          q: "What evidence should I include with my report?",
          a: "Include screenshots of communications, transaction details, relevant dates and times, contact information of involved parties, and any other digital evidence related to the incident. The more documentation you provide, the better we can assist you."
        },
        {
          q: "Can I track the status of my report?",
          a: "Yes, you can track your report status through the 'My Reports' section using your case number. You'll receive real-time updates and notifications about your case progress."
        }
      ]
    },
    {
      category: "Account Security",
      icon: "🔐",
      questions: [
        {
          q: "What should I do if I suspect my account has been compromised?",
          a: "Immediately change your password, enable two-factor authentication, and report any unauthorized activities through our platform. Document any suspicious transactions or activities."
        },
        {
          q: "How can I strengthen my account security?",
          a: "Use a strong password, enable two-factor authentication, regularly monitor your account activities, and avoid clicking on suspicious links or sharing sensitive information."
        }
      ]
    },
    {
      category: "Common Scams",
      icon: "⚠️",
      questions: [
        {
          q: "How can I identify a Momo fraud attempt?",
          a: "Be wary of unexpected requests for money transfers, unsolicited prize notifications, or pressure to act quickly. Legitimate services never ask for your PIN or full account details."
        },
        {
          q: "What are common signs of WhatsApp scams?",
          a: "Watch out for messages claiming to be from friends in emergency situations, unexpected prize notifications, or requests to forward your verification code. Always verify directly with contacts through alternative means."
        },
        {
          q: "How do I protect myself from sextortion attempts?",
          a: "Never share intimate content online, be cautious with video calls from strangers, and report any blackmail attempts immediately. Don't pay ransoms as this often leads to more demands."
        }
      ]
    },
    {
      category: "Support & Assistance",
      icon: "💡",
      questions: [
        {
          q: "Is my report information confidential?",
          a: "Yes, all report information is strictly confidential and secured. Only authorized personnel have access to case details for investigation purposes."
        },
        {
          q: "Can I report a crime on behalf of someone else?",
          a: "Yes, you can submit a report on behalf of another person. Please include your relationship to the victim and ensure you have their consent when possible."
        },
        {
          q: "What happens after I submit a report?",
          a: "You'll receive a confirmation email with your case number. Our team will review your report, may request additional information if needed, and keep you updated through the platform."
        }
      ]
    }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions about using CyberGuard</p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-2">{category.icon}</span>
                <h2 className="text-xl font-semibold text-gray-800">{category.category}</h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const index = categoryIndex * 10 + faqIndex
                  return (
                    <div 
                      key={faqIndex}
                      className="border border-gray-200 rounded-lg hover:border-blue-200 transition-colors"
                    >
                      <button
                        className="w-full flex items-center justify-between p-4 text-left"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      >
                        <span className="font-medium text-gray-900">{faq.q}</span>
                        {openIndex === index ? 
                          <ChevronUp className="w-5 h-5 text-[#0466c8]" /> : 
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        }
                      </button>
                      
                      {openIndex === index && (
                        <div className="px-4 pb-4 text-gray-600">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">We&apos;re here to help! Contact our support team for assistance.</p>
          <Link 
            href="/pages/support/contact-us" 
            className="bg-[#0466c8] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
