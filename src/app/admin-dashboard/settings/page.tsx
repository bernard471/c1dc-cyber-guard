"use client"

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminSettings() {
    
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
      <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <div className="flex-1 overflow-auto p-6">
            {/* Settings interface */}
          </div>
        </div>
      </div>
    </div>
  );
}
