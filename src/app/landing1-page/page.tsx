"use client"


import React, { useState, useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  Users,
  ArrowRight,
  CheckCircle,
  Lock,
  MessageSquare,
  Globe,
  Eye,
  Network,
  Zap,
  Terminal,
  Radio,
  ShieldAlert,
  Server
} from 'lucide-react';

// Cyber Matrix Background
const CyberMatrix = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 flex">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex-1 border-r border-blue-500/10">
            {[...Array(30)].map((_, j) => (
              <div
                key={j}
                className="h-4 text-blue-500/20 text-xs font-mono animate-fade-in"
                style={{ animationDelay: `${(i + j) * 0.1}s` }}
              >
                {Math.random().toString(36).charAt(2)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Advanced Threat Radar
const ThreatRadar = () => {
  interface Dot {
    id: number;
    x: number;
    y: number;
    type: 'threat' | 'safe';
  }
  
  const [dots, setDots] = useState<Dot[]>([]);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        const newDots = [...prev];
        if (newDots.length > 15) newDots.shift();
        newDots.push({
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          type: Math.random() > 0.5 ? 'threat' : 'safe'
        });
        return newDots;
      });
    }, 1000);
   
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 bg-black rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-ping" />
        {dots.map(dot => (
          <div
            key={dot.id}
            className={`absolute w-2 h-2 rounded-full ${
              dot.type === 'threat' ? 'bg-red-500' : 'bg-green-500'
            } animate-pulse`}
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Radio className="w-12 h-12 text-blue-500 animate-spin" style={{ animationDuration: '2s' }} />
      </div>
    </div>
  );
};

// Live Security Feed
const SecurityFeed = () => {
interface Activity {
  id: number;
  event: string;
  status: string;
  timestamp: string;
}

const [activities, setActivities] = useState<Activity[]>([]);
 
  useEffect(() => {
    const events = [
      'Firewall Update',
      'Threat Detected',
      'System Scan',
      'Access Attempt',
      'Security Patch'
    ];
   
    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivities = [...prev];
        if (newActivities.length > 4) newActivities.shift();
        newActivities.push({
          id: Date.now(),
          event: events[Math.floor(Math.random() * events.length)],
          status: Math.random() > 0.8 ? 'warning' : 'success',
          timestamp: new Date().toLocaleTimeString()
        });
        return newActivities;
      });
    }, 2000);
   
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-lg space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Live Security Feed</h3>
        <Terminal className="w-4 h-4 text-blue-500" />
      </div>
      {activities.map(activity => (
        <div
          key={activity.id}
          className="flex items-center space-x-3 text-sm animate-fade-in"
        >
          {activity.status === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          <span className="text-gray-400">{activity.timestamp}</span>
          <span className="text-white">{activity.event}</span>
        </div>
      ))}
    </div>
  );
};


// Enhanced Stats Card
interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  trend: number;
}

const StatsCard = ({ label, value, icon: Icon, trend }: StatsCardProps) => {
  return (
    <div className="relative overflow-hidden bg-gray-800 p-6 rounded-lg shadow-lg group hover:shadow-xl transition-all duration-300">
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 rounded-full group-hover:scale-110 transition-transform" />
      <div className="relative z-10">
        <Icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        <div className="text-gray-400">{label}</div>
        {trend && (
          <div className={`text-sm mt-2 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
};

// Feature Card with Animation
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-800/50 transition-colors">
          <Icon className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
        </div>
        <div className="absolute -inset-1 bg-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

// Main Component
const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('report');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const statsData = [
    { label: 'Threats Neutralized', value: '2.5M+', icon: ShieldAlert, trend: 15 },
    { label: 'Protected Users', value: '50K+', icon: Users, trend: 8 },
    { label: 'Avg Response Time', value: '1.2s', icon: Zap, trend: -20 },
    { label: 'Security Score', value: '99.99%', icon: CheckCircle, trend: 5 }
  ];

  const features = [
    {
      icon: Lock,
      title: 'Quantum Encryption',
      description: 'Next-gen encryption protecting against quantum computing threats'
    },
    {
      icon: Network,
      title: 'AI Defense Matrix',
      description: 'Advanced neural networks detecting and neutralizing threats'
    },
    {
      icon: Server,
      title: 'Distributed Security',
      description: 'Global network of secure nodes ensuring 24/7 protection'
    },
    {
      icon: Eye,
      title: 'Predictive Analysis',
      description: 'AI-powered threat prediction and prevention system'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <CyberMatrix />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="relative">
                <Shield className="w-8 h-8 text-blue-500" />
                <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur animate-pulse" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">CyberGuard</span>
            </div>
           
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <button className="px-4 py-2 text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors">
                Sign In
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                Report Incident
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 relative">
              <div className="relative">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                  Next-Gen Cybersecurity for Ghana
                </h1>
                <div className="absolute -inset-1 bg-blue-500/20 rounded-lg blur-lg -z-10" />
              </div>
              <p className="text-xl text-gray-300 mb-8">
                Quantum-secured platform with AI-powered threat detection and real-time response system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center">
                  Report Incident
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors">
                  View Demo
                </button>
              </div>
            </div>
           
            <div className="md:w-1/2">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-gray-700">
                <ThreatRadar />
                <SecurityFeed />

               
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setActiveTab('report')}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'report' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Report Crime
                  </button>
                  <button
                    onClick={() => setActiveTab('track')}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'track' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Track Case
                  </button>
                </div>

                {activeTab === 'report' ? (
                  <div className="space-y-4 mt-6">
                    <select className="w-full p-3 bg-gray-700 border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500">
                      <option value="">Select Crime Type</option>
                      <option value="momo">Mobile Money Fraud</option>
                      <option value="social">Social Media Hack</option>
                      <option value="email">Email Compromise</option>
                      <option value="crypto">Cryptocurrency Scam</option>
                      <option value="identity">Identity Theft</option>
                    </select>
                    <textarea
                      className="w-full p-3 bg-gray-700 border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500"
                      rows={4}
                      placeholder="Describe the incident..."
                    />
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                      Submit Report
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 mt-6">
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-700 border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500"
                      placeholder="Enter Case ID"
                    />
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                      Track Case
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Advanced Cybersecurity Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Next-generation protection powered by quantum computing and AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Shield className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <Globe className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <MessageSquare className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>© 2025 CyberGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;