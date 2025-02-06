"use client";

import { useState } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Shield, Book, Video, FileText, ExternalLink } from 'lucide-react';
import { resourcesData } from '@/data/resourcesData';
import { ResourcePopup } from './ResourcePopup';

type ResourceContent = {
    title: string;
    mainDescription: string;
    keyPoints: string[];
    bestPractices: string[];
    tools: string[];
  } | null;
  
  


const tabs = [
  { id: 'tips', label: 'Security Tips', icon: Shield },
  { id: 'guides', label: 'Safety Guides', icon: Book },
  { id: 'videos', label: 'Video Resources', icon: Video },
  { id: 'articles', label: 'Articles', icon: FileText },
];

const resources = {
  tips: [
    {
      title: 'Password Security',
      description: 'Use strong, unique passwords and enable two-factor authentication.',
      link: '#'
    },
    {
      title: 'Social Media Safety',
      description: 'Protect your privacy with proper security settings and be cautious with sharing.',
      link: '#'
    },
    {
      title: 'Online Banking Protection',
      description: 'Never share OTPs or banking credentials. Verify transaction details carefully.',
      link: '#'
    },
  ],
  guides: [
    {
      title: 'Digital Security Guide',
      description: 'Comprehensive guide to protecting your digital life.',
      link: '#'
    },
    {
      title: 'Mobile Security Handbook',
      description: 'Best practices for securing your mobile devices and apps.',
      link: '#'
    },
    {
      title: 'Scam Prevention Guide',
      description: 'Learn to identify and avoid common cyber scams.',
      link: '#'
    },
  ],
  videos: [
    {
      title: 'Cybersecurity Basics',
      description: 'Video series covering fundamental security practices.',
      link: '#'
    },
    {
      title: 'Scam Awareness',
      description: 'Visual guide to recognizing and avoiding cyber scams.',
      link: '#'
    },
    {
      title: 'Digital Safety Tutorial',
      description: 'Step-by-step guide to securing your online presence.',
      link: '#'
    },
  ],
  articles: [
    {
      title: 'Latest Cyber Threats',
      description: 'Stay informed about emerging cybersecurity threats.',
      link: '#'
    },
    {
      title: 'Security Best Practices',
      description: 'Expert recommendations for online safety.',
      link: '#'
    },
    {
      title: 'Digital Hygiene',
      description: 'Essential habits for maintaining cyber security.',
      link: '#'
    },
  ],
};

export const ResourceSection = () => {
    const [activeTab, setActiveTab] = useState('tips');
    const [selectedResource, setSelectedResource] = useState<ResourceContent>(null);
  
  
  return (
    <section id="resources" className="py-20 bg-[#001233]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Cybersecurity Resources
          </h2>
          <p className="text-[#979dac] text-lg">
            Educational materials to help you stay safe online
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-[#0466c8] text-white'
                    : 'bg-[#002855] text-[#7d8597] hover:bg-[#023e7d]'
                } transition-all duration-300`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <LazyMotion features={domAnimation}>
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
            {resources[activeTab as keyof typeof resources].map((resource, index) => (
        <motion.div
          key={resource.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#002855] p-6 rounded-lg border border-[#023e7d] hover:border-[#0466c8] transition-colors"
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            {resource.title}
          </h3>
          <p className="text-[#7d8597] mb-4">
            {resource.description}
          </p>
          <button
onClick={() => {
    const foundResource = resourcesData[activeTab as keyof typeof resourcesData]
      .find(item => item.title === resource.title);
    
    if (foundResource?.fullContent) {
      setSelectedResource({
        title: resource.title,
        ...foundResource.fullContent
      });
    } else {
      setSelectedResource(null);
    }
  }}
  className="inline-flex items-center text-[#0466c8] hover:text-[#0353a4] transition-colors"
          >
            Learn More
            <ExternalLink className="w-4 h-4 ml-2" />
          </button>
        </motion.div>
      ))}
          </motion.div>
</LazyMotion>

        {selectedResource && (
          <ResourcePopup
            content={selectedResource}
            onClose={() => setSelectedResource(null)}
          />
        )}
      </div>
    </section>
  );
};