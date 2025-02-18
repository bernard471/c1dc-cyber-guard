"use client"

import { useState } from 'react'
import { Home, HelpCircle, FileText, X, Menu, ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import LogoImage from '@/images/Logoimage.png';
import Image from 'next/image';

const navigationItems = [
  { icon: <Home className="w-5 h-5" />, name: 'Back to Home', id: 'home', path: '/' },
  { 
    icon: <HelpCircle className="w-5 h-5" />, 
    name: 'Support', 
    id: 'support', 
    subMenu: [
      { name: 'Help Center', id: 'help-center', path: '/pages/support/help-center' },
      { name: 'Contact Us', id: 'contact', path: '/pages/support/contact-us' },
      { name: 'FAQ', id: 'faq', path: '/pages/support/faq' },
    ]
  },
  { 
    icon: <FileText className="w-5 h-5" />, 
    name: 'Legal', 
    id: 'legal', 
    path: '/legal',
    subMenu: [
      { name: 'Privacy Policy', id: 'privacy', path: '/pages/legal/privacy-policy' },
      { name: 'Terms of Service', id: 'terms', path: '/pages/legal/terms' },
    ]
  },
]

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('')
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([])

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 ">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 md:pl-[280px]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div>
          <Link href="/" className="flex items-center">
          <Image  src={LogoImage} alt="Logo" width={32} height={32} />
          <span className="ml-2 text-xl font-bold text-blue-800">Support <span className='text-orange-500'>&&</span> Legal</span>
          </Link>
        </div>
      </div>
      </div>
    </header>
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
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center">
          <Image  src={LogoImage} alt="Logo" width={32} height={32} />
            <span className="ml-2 text-xl font-bold text-blue-800">Cyber<span className="text-orange-500">1</span>Guard</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
          {navigationItems.map((item) => (
            <div key={item.id}>
              {item.subMenu ? (
                <div>
                  <div className="flex items-center">
                      <button
                        onClick={() => {
                          setActiveTab(item.id)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`flex-1 flex items-center px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${
                          activeTab === item.id ? 'bg-gray-200 text-gray-900' : ''
                        }`}
                      >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </button>
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
                              setActiveTab(subItem.id)
                              setIsMobileMenuOpen(false)
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
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
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

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        <main className="p-6 mt-16"> {/* Added mt-16 for header spacing */}
          {children}
        </main>
      </div>
    </div>
  )
}
export default DashboardLayout