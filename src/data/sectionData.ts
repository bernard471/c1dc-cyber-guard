import { Shield, Book, Video, FileText } from 'lucide-react';

export const tabs = [
  { id: 'tips', label: 'Security Tips', icon: Shield },
  { id: 'guides', label: 'Safety Guides', icon: Book },
  { id: 'videos', label: 'Video Resources', icon: Video },
  { id: 'articles', label: 'Articles', icon: FileText },
];

export const resources = {
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
