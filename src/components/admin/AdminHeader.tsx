"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Menu } from "lucide-react"

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Input
            type="search"
            placeholder="Search..."
            className="w-full md:w-64 hidden md:block"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </div>
    </header>
  )
}
