"use client"


import React, { useState, useEffect } from 'react';


import { Navigation } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Categories } from '@/components/FeaturesSection';
import { StatsSection } from '@/components/StatsSection';
import { HeroSection } from '@/components/HeroSection';
import { ResourceSection } from '@/components/ResourceSection';
import { CrimeReportTabs } from '@/components/CrimeReportTabs';

const CyberGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-blue-200/10" />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-b border-blue-200/10" />
          ))}
        </div>
      </div>
    </div>
  );
};

const FloatingParticles = () => {
    const [particles, setParticles] = React.useState<Array<{left: string, top: string, delay: string}>>([]);
    React.useEffect(() => {
        // Generate particle positions on client side only
        const newParticles = Array(20).fill(0).map((_, i) => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          delay: `${i * 0.5}s`
        }));
        setParticles(newParticles);
      }, []);
    
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-float"
              style={{
                animationDelay: particle.delay,
                left: particle.left,
                top: particle.top
              }}
            />
          ))}
        </div>
      );
    };

const NetworkLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-20">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

  
const WelcomeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gradient-to-br from-[#002255] to-[#001233] p-10 rounded-2xl max-w-3xl mx-4 relative border border-blue-400/40 shadow-xl shadow-blue-500/30 backdrop-blur-sm transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 mb-6">
            Welcome to Cyber1Defense Communication&apos;s Cyber Crime Reporting Platform!
          </h2>
          <div className="space-y-6 text-blue-100">
            <p className="leading-relaxed">
              Hey there! 👋 You&apos;ve just entered the #1 <span className="font-bold">Cyber<span className="text-orange-500">1</span>Guard</span>
              , where online threats get neutralized, and justice is delivered. I&apos;m DK Cyber 🦸‍♂️, your trusted cyber crime fighter, and I want you to know—you&apos;re not alone in this.
            </p>
            <p className="leading-relaxed">
              No matter the cyber issue, we&apos;ve got your back. Just report it, sit back, sip on your coffee ☕, and let us handle the heavy lifting. Your safety is our priority! 🔒
            </p>
            <p className="text-lg font-semibold text-cyan-300 mt-4">
              Stay secure, stay confident. ✨
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg shadow-blue-500/30"
          >
            Let&apos;s Begin 🚀
          </button>
        </div>
      </div>
    </div>
  );
};






const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check if it's the first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisited', 'true');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#001233] relative">
      <WelcomeModal 
        isOpen={showWelcome} 
        onClose={() => setShowWelcome(false)} 
      />
      <CyberGrid />
      <FloatingParticles />
      <NetworkLines />

      {/* Navigation */}
      <Navigation isScrolled={isScrolled} />

      {/* Hero Section */}
      <HeroSection />

        {/* Report Section */}
        <CrimeReportTabs />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <Categories />

      {/*  Resource Section  */}
      <ResourceSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;