"use client";

import React, { useEffect, useState } from 'react';
import { AdminStats } from '@/components/admin/admin-stats';
import { RecentReports} from '@/components/admin/recent-reports';
import { RecentUsers } from '@/components/admin/recent-users';
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Loader2 } from "lucide-react";


const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [recentReports, setRecentReports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeReports, setActiveReports] = useState(0);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/admin/users');
        const data = await response.json();
        if (data.success) {
          setTotalUsers(data.totalUsers);
          setRecentUsers(data.recentUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const [usersResponse, reportsResponse, recentReportsResponse, activeReportsResponse] = await Promise.all([
            fetch('/api/admin/users'),
            fetch('/api/admin/reports'),
            fetch('/api/admin/recent-reports'),
            fetch('/api/admin/reports-by-status')
          ]);
        
          const userData = await usersResponse.json();
          const reportsData = await reportsResponse.json();
          const recentReportsData = await recentReportsResponse.json();
          const activeReportsData = await activeReportsResponse.json();

          if (activeReportsData.success) {
            setActiveReports(activeReportsData.activeReports);
          }

          if (recentReportsData.success) {
            setRecentReports(recentReportsData.recentReports);
          }
        
          if (userData.success) {
          setTotalUsers(userData.totalUsers);
          setRecentUsers(userData.recentUsers);
        }
        
        if (reportsData.success) {
          setTotalReports(reportsData.totalReports);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-lg font-medium text-gray-600">Loading dashboard...</p>
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
        <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
            <AdminStats
              totalReports={totalReports}
              activeReports={activeReports}
              totalUsers={totalUsers}
            />
            <div className="grid grid-cols-1 gap-6">
              <RecentReports reports={recentReports} />
              <RecentUsers users={recentUsers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
