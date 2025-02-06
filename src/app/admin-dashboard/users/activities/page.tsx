"use client"

import { useState, useEffect } from 'react';
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft } from "lucide-react";

interface UserReport {
  reportId: string;
  type: string;
  status: string;
  createdAt: string;
  description: string;
}

export default function UserActivities() {
  const router = useRouter();
  const [reports, setReports] = useState<UserReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('selectedUserId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchReports(storedUserId);
    }
  }, []);

  const fetchReports = async (id: string) => {
    try {
      console.log('Fetching reports for userId:', id);
      const response = await fetch('/api/admin/users/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id })
      });
      const data = await response.json();
      console.log('Received data:', data);
      if (data.success) {
        setReports(data.reports);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

    

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-lg font-medium text-gray-600">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <button 
              onClick={() => router.back()}
              className="mb-6 flex items-center text-indigo-600 hover:text-indigo-900 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </button>
            
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">User Activities</h2>
                <div className="space-y-6">
                  {reports.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No activities found for this user.</p>
                  ) : (
                    reports.map((report) => (
                      <div key={report.reportId} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{report.type}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(report.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            report.status === 'resolved' 
                              ? 'bg-green-100 text-green-800'
                              : report.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-gray-600">{report.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
