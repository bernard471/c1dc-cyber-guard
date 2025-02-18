"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  AlertTriangle,
  FileText,
  Home,
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import LogoImage from '@/images/Logoimage.png';
import Image from 'next/image';



const navigationItems = [
  { icon: <Home className="w-5 h-5" />, name: 'Home', id: 'home', path: '/' },
  { icon: <LayoutDashboard className="w-5 h-5" />, name: 'Dashboard', id: 'dashboard', path: '/dashboard' },
  { 
    icon: <AlertTriangle className="w-5 h-5" />, 
    name: 'Report Crimes Here', 
    id: 'report', 
    path: '/report-crime',
    subMenu: [
      { name: 'Momo Fraud 💰', id: 'momo-fraud', path: '/report-crime/momo-fraud' },
      { name: 'WhatsApp Hacks 💬', id: 'whatsapp-hacks', path: '/report-crime/whatsapp-hacks' },
      { name: 'Social Acounts Hacks 📱', id: 'social-account-hacks', path: '/report-crime/social-account-hacks' },
      { name: 'Sextortion/Blackmail ⚠️', id:'sextortion', path: '/report-crime/sextortion-and-blackmail' },
      { name: 'Email Hacks 📧', id: 'email-hacks', path: '/report-crime/email-hacks' },
      { name: 'Tracking/Stalking 🎯', id: 'stalking', path: '/report-crime/stalking' },
      { name: 'Identity Theft 🎭', id: 'identity-theft', path: '/report-crime/identity-theft' },
      { name: 'Shopping Scams 🛍️', id:'shopping', path: '/report-crime/shopping-scams' },
      { name: 'Cryptocurrency Scams ₿', id: 'crypto', path: '/report-crime/crypto-scams' },
      { name: 'Employment Scams 💼', id: 'employment', path: '/report-crime/employment-scams' },
      { name: 'Financial Frauds 💸 ', id: 'finance', path: '/report-crime/financial-frauds' },
      { name: 'Other Fraud Activities ‼️', id: 'other', path: '/report-crime/other-fraudulent-activities' },
    ]
  },
  { icon: <FileText className="w-5 h-5" />,name: 'My Reports',id: 'reports',path: '/my-reports' },
  { icon: <MessageSquare className="w-5 h-5" />, name: 'Messages', id: 'messages', path: '/messages' },
  { icon: <BookOpen className="w-5 h-5" />, 
    name: 'Current Resources', 
    id: 'resources', 
    path: '/resources/emergency-support',
    subMenu: [
      { name: 'Emergency Support ⚠️', id: 'emergency-support', path: '/resources/emergency-support' },
      { name: 'Educational Resources 📚', id: 'educational-resources', path: '/resources/education-resources' },
      { name: 'Local Authorities 👮', id: 'local-authorities', path: '/resources/local-authorities' },
    ] },
];

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();



  const initialOpenDropdowns = navigationItems
    .filter(item => item.subMenu?.some(sub => sub.id === activeTab))
    .map(item => item.id);
    
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(initialOpenDropdowns);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  

  return (
    <>
      <button 
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden hover:bg-gray-100"
    >
      {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>


      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        w-[280px] bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        flex flex-col h-screen
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-5 border-b flex items-center">
          <Image  src={LogoImage} alt="Logo" width={32} height={32} />
          <h1 className="text-xl font-bold text-gray-800 pl-2">Cyber<span className="text-orange-600">1</span>Guard</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {navigationItems.map((item) => (
  <div key={item.id}>
    {item.subMenu ? (
      <div>
        <div className="flex items-center">
          <Link href={item.path}>
            <button
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex-1 flex items-center px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${
                activeTab === item.id ? 'bg-gray-200 text-gray-900' : ''
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </button>
          </Link>
          <button
            onClick={() => toggleDropdown(item.id)}
            className="px-2 py-1 bg-blue-100 text-gray-600 hover:text-gray-900"
          >
            {openDropdowns.includes(item.id) ? 
              <ChevronDown className="w-6 h-8 border-l border-gray-200" /> : 
              <ChevronRight className="w-6 h-8 border-l border-gray-200" />
            }
          </button>
        </div>
        {openDropdowns.includes(item.id) && (
          <div className="ml-8 border-l border-gray-200">
            {item.subMenu.map((subItem) => (
              <Link href={subItem.path} key={subItem.id}>
                <button
                  onClick={() => {
                    setActiveTab(subItem.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
                    activeTab === subItem.id ? 'bg-gray-200 text-gray-900' : ''
                  }`}
                >
                  {subItem.name}
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    ) : (
      <Link href={item.path}>
      <button
        onClick={async () => {
          setActiveTab(item.id);
          setIsMobileMenuOpen(false);
          
          if (item.id === 'home') {
            try {
              if (session) {
                // For Google-authenticated users
                await signOut({ 
                  redirect: true,
                  callbackUrl: '/' 
                });
              } else {
                // For credential-authenticated users
                await fetch('/api/auth/logout', {
                  method: 'POST',
                });
                router.push('/');
              }
            } catch (error) {
              console.error('Logout failed:', error);
            }
          }
        }}
        className={`w-full flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
          activeTab === item.id ? 'bg-gray-100 text-gray-900' : ''
        }`}
      >
        {item.icon}
        <span className="ml-3">{item.name}</span>
      </button>
    </Link>
    )}
  </div>
))}

        </nav>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
