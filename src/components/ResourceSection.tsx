"use client";

import { useState } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { resourcesData } from '@/data/resourcesData';
import { ResourcePopup } from './ResourcePopup';
import { SocialMediaSafetyPopup } from './SocialMediaSafetyPopup';
import { OnlineBankingPopup } from './OnlineBankingPopup';
import { DigitalSecurityGuidePopup } from './DigitalSecurityGuidePopup';
import { MobileSecurityPopup } from './MobileSecurityPopup';
import { ScamPreventionPopup } from './ScamPreventionPopup';
import { tabs, resources } from '@/data/sectionData';
import { ScamAwarenessVideo } from './ScamAwarenessVideo';
import { CybersecurityBasicsVideo } from './CybersecurityBasicsVideo';
import { ArticlePopup } from './ArticlePopup';
import { BestPracticeDetail, DigitalHygienePractice, SecuritySection } from '@/types/resources';
import { SecurityBestPracticesPopup } from './SecurityBestPracticesPopup';
import { DigitalHygienePopup } from './DigitalHygienePopup';
import { DigitalSafetyVideo } from './DigitalSafetyVideo';

export const ResourceSection = () => {
    const [activeTab, setActiveTab] = useState('tips');
    const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);

    const renderPopup = () => {
      if (!selectedResourceId) return null;
  
      const resource = resourcesData[activeTab as keyof typeof resourcesData]
          ?.find(item => item.id === selectedResourceId);
  
      if (!resource) return null;
  
      switch (resource.id) {
          case 'password-security':
              if ('mainDescription' in resource.fullContent) {
                  return <ResourcePopup 
                      content={{
                          title: resource.title,
                          mainDescription: resource.fullContent.mainDescription,
                          keyPoints: resource.fullContent.keyPoints,
                          bestPractices: resource.fullContent.bestPractices,
                          tools: resource.fullContent.tools
                      }} 
                      onClose={() => setSelectedResourceId(null)} 
                  />;
              }
              break;
              case 'social-media-safety':
                if ('platformGuides' in resource.fullContent && resource.fullContent.platformGuides) {
                    return <SocialMediaSafetyPopup 
                        content={{
                            title: resource.title,
                            mainDescription: resource.fullContent.mainDescription,
                            keyPoints: resource.fullContent.keyPoints,
                            bestPractices: resource.fullContent.bestPractices,
                            tools: resource.fullContent.tools,
                            platformGuides: resource.fullContent.platformGuides
                        }} 
                        onClose={() => setSelectedResourceId(null)} 
                    />;
                }
                break;
                case 'online-banking-protection':
                  if ('otpGuidelines' in resource.fullContent && resource.fullContent.otpGuidelines) {
                      return <OnlineBankingPopup 
                          content={{
                              title: resource.title,
                              mainDescription: resource.fullContent.mainDescription,
                              keyPoints: resource.fullContent.keyPoints,
                              bestPractices: resource.fullContent.bestPractices,
                              tools: resource.fullContent.tools,
                              otpGuidelines: resource.fullContent.otpGuidelines
                          }} 
                          onClose={() => setSelectedResourceId(null)} 
                      />;
                  }
                  break;
              
                  case 'digital-security-guide':
                    if ('chapters' in resource.fullContent && 
                        'introduction' in resource.fullContent && 
                        'recommendations' in resource.fullContent &&
                        'tools' in resource.fullContent &&
                        resource.fullContent.chapters &&
                        resource.fullContent.recommendations &&
                        resource.fullContent.tools &&
                        !('videoUrl' in resource.fullContent)) {
                        return <DigitalSecurityGuidePopup 
                            content={{
                                title: resource.title,
                                introduction: resource.fullContent.introduction,
                                chapters: resource.fullContent.chapters,
                                recommendations: resource.fullContent.recommendations,
                                tools: resource.fullContent.tools
                            }} 
                            onClose={() => setSelectedResourceId(null)} 
                        />;
                    }
                    break;
                
                
                    case 'mobile-security-handbook':
                      if ('sections' in resource.fullContent && 
                          'securityTools' in resource.fullContent && 
                          'bestPractices' in resource.fullContent &&
                          resource.fullContent.sections &&
                          resource.fullContent.securityTools &&
                          resource.fullContent.bestPractices &&
                          resource.fullContent.sections.every(section => 'points' in section)) {
                          return <MobileSecurityPopup 
                              content={{
                                  title: resource.title,
                                  introduction: resource.fullContent.introduction,
                                  sections: resource.fullContent.sections as SecuritySection[],
                                  securityTools: resource.fullContent.securityTools,
                                  bestPractices: resource.fullContent.bestPractices
                              }} 
                              onClose={() => setSelectedResourceId(null)} 
                          />;
                      }
                      break;
                  
                  
                  
                      case 'scam-prevention-guide':
                        if ('scamTypes' in resource.fullContent && resource.fullContent.scamTypes) {
                            return <ScamPreventionPopup 
                                content={{
                                    title: resource.title,
                                    introduction: resource.fullContent.introduction,
                                    scamTypes: resource.fullContent.scamTypes,
                                    redFlags: resource.fullContent.redFlags,
                                    protectionMeasures: resource.fullContent.protectionMeasures,
                                    responseSteps: resource.fullContent.responseSteps
                                }} 
                                onClose={() => setSelectedResourceId(null)} 
                            />;
                        }
                        break;

                              case 'cybersecurity-basics':
                                if ('videoUrl' in resource.fullContent) {
                                    return <CybersecurityBasicsVideo 
                                        content={resource.fullContent} 
                                        onClose={() => setSelectedResourceId(null)} 
                                    />;
                                }
                                break;

                                case 'scam-awareness':
                                  if ('videoUrl' in resource.fullContent) {
                                    return <ScamAwarenessVideo
                                        content={resource.fullContent} 
                                        onClose={() => setSelectedResourceId(null)} 
                                    />;
                                }
                                break;

                                case 'digital-safety-tutorial':
                        if ('videoUrl' in resource.fullContent) {
                            return <DigitalSafetyVideo 
                                content={resource.fullContent} 
                                onClose={() => setSelectedResourceId(null)} 
                            />;
                        }
                        break;

                              case 'latest-cyber-threats':
                                if ('sections' in resource.fullContent && 
                                    'author' in resource.fullContent && 
                                    'references' in resource.fullContent &&
                                    'tips' in resource.fullContent &&
                                    resource.fullContent.sections &&
                                    resource.fullContent.references &&
                                    resource.fullContent.tips) {
                                    return <ArticlePopup 
                                        content={{
                                            title: resource.fullContent.title,
                                            author: resource.fullContent.author,
                                            publishDate: resource.fullContent.publishDate,
                                            introduction: resource.fullContent.introduction,
                                            sections: resource.fullContent.sections,
                                            tips: resource.fullContent.tips,
                                            references: resource.fullContent.references
                                        }} 
                                        onClose={() => setSelectedResourceId(null)} 
                                    />;
                                }
                                break;
                            
                            
                                case 'security-best-practices':
                                  if ('sections' in resource.fullContent && 
                                      'author' in resource.fullContent && 
                                      'references' in resource.fullContent &&
                                      'bestPracticeDetails' in resource.fullContent &&
                                      resource.fullContent.sections &&
                                      resource.fullContent.references &&
                                      resource.fullContent.bestPracticeDetails) {
                                      return <SecurityBestPracticesPopup 
                                          content={{
                                              title: resource.fullContent.title,
                                              author: resource.fullContent.author,
                                              publishDate: resource.fullContent.publishDate,
                                              introduction: resource.fullContent.introduction,
                                              sections: resource.fullContent.sections,
                                              bestPracticeDetails: resource.fullContent.bestPracticeDetails as BestPracticeDetail[],
                                              references: resource.fullContent.references
                                          }} 
                                          onClose={() => setSelectedResourceId(null)} 
                                      />;
                                  }
                                  break;
                              
                                  case 'digital-hygiene':
                                    if ('practices' in resource.fullContent && 
                                        'familyGuidelines' in resource.fullContent &&
                                        resource.fullContent.practices &&
                                        resource.fullContent.familyGuidelines) {
                                        return <DigitalHygienePopup 
                                            content={{
                                                title: resource.title,
                                                author: resource.fullContent.author,
                                                publishDate: resource.fullContent.publishDate,
                                                introduction: resource.fullContent.introduction,
                                                practices: resource.fullContent.practices as DigitalHygienePractice[],
                                                familyGuidelines: resource.fullContent.familyGuidelines,
                                                references: resource.fullContent.references
                                            }} 
                                            onClose={() => setSelectedResourceId(null)} 
                                        />;
                                    }
                                    break;
                                

                        default:
                return null;
             }
        };

    return (
        <section id="resources" className="py-20 bg-[#001233]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title section remains the same */}
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

                {/* Tabs section remains the same */}
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

                {/* Resources Grid */}
                <LazyMotion features={domAnimation}>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {resources[activeTab as keyof typeof resources].map((resource, index) => {
                            const resourceData = resourcesData[activeTab as keyof typeof resourcesData]
                                ?.find(item => item.title === resource.title);

                            return (
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
                                        onClick={() => resourceData && setSelectedResourceId(resourceData.id)}
                                        className="inline-flex items-center text-[#0466c8] hover:text-[#0353a4] transition-colors"
                                    >
                                        Learn More
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </LazyMotion>

                {/* Render appropriate popup */}
                {renderPopup()}
            </div>
        </section>
    );
};
