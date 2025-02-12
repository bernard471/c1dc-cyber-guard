"use client"

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { Mail, Phone, MessageSquare, Clock } from 'lucide-react'
import { useState } from 'react'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6 text-[#0466c8]" />,
      title: "Emergency Hotline",
      description: "24/7 Support Available",
      value: "+233 (0) 552 373 603",
      badge: "Always Available"
    },
    {
      icon: <Mail className="w-6 h-6 text-[#0466c8]" />,
      title: "Email Support",
      description: "Send us a message anytime",
      value: "c1dcreports@gmail.com",
      badge: "24hr Response"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#0466c8]" />,
      title: "Live Chat",
      description: "Chat with our support team",
      value: "Start Chat",
      badge: "Online"
    },
    {
      icon: <Clock className="w-6 h-6 text-[#0466c8]" />,
      title: "Office Hours",
      description: "Visit our office",
      value: "Mon-Fri: 8AM - 5PM",
      badge: "GMT"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  
  

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600">Get in touch with our support team for assistance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {method.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{method.title}</h3>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                  <p className="text-[#0466c8] font-medium mt-2">{method.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="How can we help?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us more about your inquiry..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-[#0466c8] text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
