"use client"


import React, { useState, } from 'react';
import { Search,BookOpen,Video,FileText, Shield } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import Sidebar from '@/components/Sidebar';
import { safetyGuides } from '@/safety/safetGuides';
import { videoTutorials } from '@/safety/videoTutorials';
import VideoCarousel from '@/components/VideoCarousel';
import { cybersecurityArticles } from '@/safety/articles';
import ArticleView from '@/components/ArticleView';

interface Resource {
  id: number;
  title: string;
  category: string;
  type: string;
  description: string;
  duration?: string;

}

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('educational-resources');

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  
  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'guides', name: 'Safety Guides', icon: Shield },
    { id: 'videos', name: 'Video Tutorials', icon: Video },
    { id: 'articles', name: 'Articles', icon: FileText },
    
  ];

  const resources = [
    {
      id: 1,
      title: 'Protecting Your Online Identity',
      category: 'guides',
      type: 'guide',
      description: 'Learn essential steps to protect your personal information online.',
    },
    {
      id: 2,
      title: 'Mobile Money Fraud Prevention',
      category: 'videos',
      type: 'video',
      description: 'Watch this video to learn how to identify and prevent mobile money fraud.',
    },
    {
        id: 3,
        title: "Understanding Cyber Threats in Ghana's Digital Economy",  // This should match exactly with the article title in articles.ts
        category: 'articles',
        type: 'article',
        description: 'Stay informed about recent cybercrime patterns and prevention strategies.',
      }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const Icon = resource.category === 'guides' ? Shield :
                resource.category === 'videos' ? Video :
                resource.category === 'articles' ? FileText :
                BookOpen;

    return (
      <div 
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
        onClick={() => setSelectedResource(resource as unknown as null)}
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${
                resource.category === 'guides' ? 'bg-blue-100 text-blue-600' :
                resource.category === 'videos' ? 'bg-red-100 text-red-600' :
                resource.category === 'articles' ? 'bg-green-100 text-green-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4"> 
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ResourceModal = ({ resource, onClose }: { resource: Resource; onClose: () => void }) => {
  const [currentVideo, setCurrentVideo] = useState(0);

  
    const guide = resource.category === 'guides' 
      ? safetyGuides.find(g => g.title === resource.title)
      : null;

      const article = resource.category === 'articles' 
    ? cybersecurityArticles.find(a => a.title === resource.title)
    : null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{resource.title}</h2>
                <p className="mt-2 text-gray-600">{resource.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
  
            {resource.category === 'guides' && guide && (
              <div className="prose max-w-none">
                {guide.content.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {section.heading}
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {section.details.map((detail, idx) => (
                        <li key={idx} className="text-gray-600">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

                {resource.category === 'videos' && (
                            <div className="mt-6">
                            <VideoCarousel
                                videos={videoTutorials}
                                currentVideo={currentVideo}
                                setCurrentVideo={setCurrentVideo}
                            />
                            </div>
                        )}

                    {resource.category === 'articles' && article && (
                                <ArticleView article={article} />
                            )}
            
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
    {/* Main Content */}
    <div className="flex-1 overflow-auto">
    <DashboardHeader />
   <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Educational Resources</h1>
        <p className="mt-2 text-gray-600">
          Learn about cybersecurity, online safety, and fraud prevention
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-200 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid gap-6">
        {filteredResources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {/* Resource Modal */}
      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </div>
    </div>
    </div>
  );
};

export default KnowledgeBase;
