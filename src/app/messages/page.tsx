"use client"

import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Bell,
  Clock,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';

const MessageSession = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatusUpdates = async () => {
      try {
        const response = await fetch('/api/user/status-updates');
        const data = await response.json();
        if (data.success) {
          setStatusUpdates(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch status updates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusUpdates();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusStyles: { [key: string]: string } = {
      resolved: "bg-green-500",
      in_progress: "bg-yellow-500",
      under_review: "bg-blue-500",
      pending: "bg-gray-500"
    };
    return statusStyles[status] || "bg-gray-500";
  };

  return (
    <div className="flex h-screen max-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 border-r bg-gray-50">
        <DashboardHeader />
        <div className="p-4 border-b">     
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Status Updates</h2>
            <div className="mt-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                  </div>
                ) : (
                  statusUpdates.map((update: {
                    _id: string
                    status: string
                    reportId: string
                    updatedAt: string
                    statusMessage: string
                  }) => (
                    <div
                      key={update._id}
                      className="p-4 border-b hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full p-2 ${getStatusBadge(update.status)}`}>
                          <Bell className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h3 className="font-medium">Report {update.reportId}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{update.status}</Badge>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(update.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{update.statusMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSession;
