"use client"

import { Bell, UserCircle, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userData, setUserData] = useState<{ name?: string; email?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        console.log('User data response:', data); // Track API response
        
        if (data.data) {
          setUserData(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.success) {
            router.push('/auth/login');
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

  return (
    <header className="bg-white shadow-sm relative">
  <div className="flex items-center justify-between px-6 py-4 md:px-6 pl-16 md:pl-6">
    <h2 className=" text-xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-6 h-6" />
          </button>
          <div className="relative">
            <button 
              className="p-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <UserCircle className="w-6 h-6" />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">{userData?.name}</p>
                  <p className="text-gray-500 text-xs">{userData?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
