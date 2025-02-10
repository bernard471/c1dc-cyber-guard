// Base content type that matches your popup component's needs
export type ResourceContent = {
  title: string;
  mainDescription: string;
  keyPoints: string[];
  bestPractices: string[];
  tools: string[];
}
  
  // Props type for the ResourcePopup component
  export type ResourcePopupProps = {
    content: ResourceContent;
    onClose: () => void;
  }
  

  export type PlatformGuides = {
    whatsapp: string[];
    instagram: string[];
    tiktok: string[];
    facebook: string[];
  }
  
  export type SocialMediaContent = {
    title: string;
    mainDescription: string;
    keyPoints: string[];
    bestPractices: string[];
    tools: string[];
    platformGuides: PlatformGuides;
  }
  
  export type SocialMediaSafetyPopupProps = {
    content: SocialMediaContent;
    onClose: () => void;
  }
  

  export type OTPGuidelines = {
    general: string[];
    securityMeasures: string[];
    otpProtection: string[];
  }
  
  export type OnlineBankingContent = {
    title: string;
    mainDescription: string;
    keyPoints: string[];
    bestPractices: string[];
    tools: string[];
    otpGuidelines: OTPGuidelines;
  }
  
  export type OnlineBankingPopupProps = {
    content: OnlineBankingContent;
    onClose: () => void;
  }
  

  export type GuideChapter = {
    title: string;
    content: string[];
}
  
export type DigitalSecurityGuideContent = {
  title: string;
  introduction: string;
  chapters: GuideChapter[];  // Use GuideChapter instead of Chapter
  recommendations: string[];
  tools: string[];
}
  
  export type DigitalSecurityGuideProps = {
    content: DigitalSecurityGuideContent;
    onClose: () => void;
  }
  

  export type SecuritySection = {
    title: string;
    points: string[];
}
  
  export type MobileSecurityContent = {
    title: string;
    introduction: string;
    sections: SecuritySection[];
    securityTools: string[];
    bestPractices: string[];
  }
  
  export type MobileSecurityPopupProps = {
    content: MobileSecurityContent;
    onClose: () => void;
  }
  
  export type ScamType = {
    name: string;
    description: string;
}

export type ScamPreventionContent = {
    title: string;
    introduction: string;
    scamTypes: ScamType[];
    redFlags: string[];
    protectionMeasures: string[];
    responseSteps: string[];
}

export type ScamPreventionPopupProps = {
    content: ScamPreventionContent;
    onClose: () => void;
}


export type VideoChapter = {
  title: string;
  timestamp: string;
}

export type VideoContent = {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  chapters: VideoChapter[];
  keyTakeaways: string[];
}

export type VideoPopupProps = {
  content: VideoContent;
  onClose: () => void;
}

export type ArticleReference = {
  title: string;
  url: string;
}

export type ArticleSection = {
  title: string;
  content: string[];
}

export type ArticleContent = {
  title: string;
  author: string;
  publishDate: string;
  introduction: string;
  sections: ArticleSection[];
  tips: string[];
  references: ArticleReference[];
}

export type ArticlePopupProps = {
  content: ArticleContent;
  onClose: () => void;
}


export type BestPracticeDetail = {
  practice: string;
  description: string;
  importance: 'Critical' | 'High' | 'Medium' | 'Low';
}

export type SecurityBestPracticesContent = {
  title: string;
  author: string;
  publishDate: string;
  introduction: string;
  sections: ArticleSection[];
  bestPracticeDetails: BestPracticeDetail[];
  references: ArticleReference[];
}

export type SecurityBestPracticesPopupProps = {
  content: SecurityBestPracticesContent;
  onClose: () => void;
}

export type DigitalHygienePractice = {
  title: string;
  details: string[];
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export type DigitalHygieneContent = {
  title: string;
  author: string;
  publishDate: string;
  introduction: string;
  practices: DigitalHygienePractice[];
  familyGuidelines: string[];
  references: ArticleReference[];
}

export type DigitalHygienePopupProps = {
  content: DigitalHygieneContent;
  onClose: () => void;
}
