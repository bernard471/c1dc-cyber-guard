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

  
  // Live Security Feed



const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="min-h-screen bg-[#001233] relative">
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