"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Menu, X } from 'lucide-react'

interface NavigationProps {
  isScrolled: boolean;
}

export const Navigation = ({ isScrolled }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Report Crime', href: '#report-crime' },
    { name: 'Resources', href: '#resources' },
  ]

  return (
    <nav className={`fixed w-full z-50 backdrop-blur-lg transition-all duration-300 ${
      isScrolled ? 'bg-[#001233]/95 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Shield className="w-8 h-8 text-[#0466c8]" />
              <span className="ml-2 text-xl font-bold text-[#979dac] hover:text-white transition-colors">
                CyberGuard
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white hover:text-[#7d8597] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-md bg-[#0466c8] px-4 py-2 text-sm font-medium text-white hover:bg-[#0353a4] transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden ">
            <button
              type="button"
              className="text-[#7d8597] hover:text-[#979dac]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-lg">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#7d8597] hover:bg-[#001845] hover:text-[#979dac]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/auth/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-[#0466c8] hover:bg-[#0466c8]/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/report-incident"
                className="block w-full rounded-md bg-[#0466c8] px-3 py-2 text-center text-base font-medium text-white hover:bg-[#0353a4]"
                onClick={() => setIsMenuOpen(false)}
              >
                Report Incident
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
