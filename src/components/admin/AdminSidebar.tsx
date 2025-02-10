"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { BarChart, FileText, Users, X } from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={`
      fixed top-0 left-0 h-full z-40 bg-white border-r flex-shrink-0
      transform transition-transform duration-200 ease-in-out
      w-64 lg:translate-x-0 lg:static lg:h-screen
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-4 h-full w-64 bg-white border-r shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="space-y-2">
          <Link href="/admin-dashboard">
            <Button 
              variant={pathname === '/admin-dashboard' ? 'default' : 'ghost'} 
              className="w-full justify-start"
            >
              <BarChart className="mr-2 h-4 w-4" />
              Overview
            </Button>
          </Link>
          <Link href="/admin-dashboard/reports">
            <Button 
              variant={pathname === '/admin-dashboard/reports' ? 'default' : 'ghost'}
              className="w-full justify-start"
            >
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
          </Link>
          <Link href="/admin-dashboard/users">
            <Button 
              variant={pathname === '/admin-dashboard/users' ? 'default' : 'ghost'}
              className="w-full justify-start"
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
