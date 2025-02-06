export interface BaseReport {
    reportId: string;
    status: string;
    createdAt: string; 
    evidenceFiles: {
      fileName: string;
      uploadDate: string;
    }[];
  }
  
  export interface MomoReport extends BaseReport {
    type: 'momo';
    momoNumber: string;
    transactionId: string;
    provider: string;
    amount: number;
    dateOfTransaction: string;
    description: string;
    fraudsterNumber: string;
    fraudsterName: string;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }
  
  export interface WhatsAppReport extends BaseReport {
    type: 'whatsapp';
    phoneNumber: string;
    hackMethod: string;
    dateOfHack: string;
    description: string;
    suspectedPerpetrator: string;
    accountAccess: string;
    recoveryAttempted: boolean;
    messagesCompromised: boolean;
    contactsAffected: boolean;
    financialLoss: number | null;
    twoFactorEnabled: boolean;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }
  

  export interface SocialAccountReport extends BaseReport {
    type: 'social-account';
    platform: string;
    username: string;
    accountEmail: string;
    accountPhone: string;
    hackMethod: string;
    dateOfHack: string;
    description: string;
    suspectedPerpetrator: string;
    accountStatus: string;
    recoveryAttempted: boolean;
    postsCompromised: boolean;
    messagesAccessed: boolean;
    followersLost: number;
    financialLoss: number | null;
    twoFactorEnabled: boolean;
    emailCompromised: boolean;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }
  
  export interface SextortionReport extends BaseReport {
    type: 'sextortion';
    platform: string;
    threatType: string;
    dateOfIncident: string;
    description: string;
    perpetratorInfo: {
      platform: string;
      username: string;
      phone: string;
      email: string;
      otherDetails: string;
    };
    demandAmount: number;
    paymentMethod: string;
    socialMediaHandles: {
      platform: string;
      username: string;
    }[];
    threatsReceived: string;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }
  
  export interface EmailHackReport extends BaseReport {
    type: 'email-hack';
    emailAddress: string;
    emailProvider: string;
    hackMethod: string;
    dateOfHack: string;
    description: string;
    suspectedPerpetrator: string;
    accountStatus: string;
    recoveryAttempted: boolean;
    emailsCompromised: boolean;
    contactsAffected: boolean;
    passwordChanged: boolean;
    financialLoss: number | null;
    twoFactorEnabled: boolean;
    linkedAccountsAffected: boolean;
    recoveryEmailCompromised: boolean;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }
  
  export interface LocationTrackingReport extends BaseReport {
    type: 'location-tracking';
    trackingMethod: string;
    dateDiscovered: string;
    duration: string;
    description: string;
    suspectedPerpetrator: string;
    locationAffected: string;
    devicesAffected: {
      deviceType: string;
      deviceName: string;
      affectedDate: string;
    }[];
    physicalStalking: boolean;
    onlineStalking: boolean;
    threatsReceived: boolean;
    policeReported: boolean;
    restrainingOrder: boolean;
    financialLoss: number | null;
    safetyMeasures: string;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }
  
  export interface IdentityTheftReport extends BaseReport {
    type: 'identity-theft';
    typeOfTheft: string;
    dateDiscovered: string;
    description: string;
    suspectedMethod: string;
    suspectedPerpetrator: string;
    documentsCompromised: {
      documentType: string;
      dateCompromised: string;
      details: string;
    }[];
    accountsAffected: {
      accountType: string;
      institution: string;
      dateAffected: string;
    }[];
    creditCardsFraud: boolean;
    bankAccountsFraud: boolean;
    loansCreated: boolean;
    governmentDocuments: boolean;
    socialMediaImpersonation: boolean;
    businessImpersonation: boolean;
    financialLoss: number | null;
    policeReported: boolean;
    creditBureauNotified: boolean;
    bankNotified: boolean;
    actionsTaken: string;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }
  
  export interface ShoppingScamReport extends BaseReport {
    type: 'shopping-scam';
    platformUsed: string;
    dateOfIncident: string;
    description: string;
    scammerDetails: {
      name: string;
      phone: string;
      email: string;
      socialMedia: string;
      otherDetails: string;
    };
    productType: string;
    paymentMethod: string;
    orderDetails: {
      orderNumber: string;
      amountLost: number;
      websiteURL: string;
      sellerContact: string;
      deliveryPromised: string;
    };
    scamIndicators: {
      fakeWebsite: boolean;
      fakeProduct: boolean;
      nonDelivery: boolean;
    };
    actionsStatus: {
      bankInformed: boolean;
      policeReported: boolean;
      productReceived: boolean;
    };
    actionsTaken: string;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }
  
  export interface CryptoScamReport extends BaseReport {
    type: 'crypto-scam';
    scamType: string;
    dateOfIncident: string;
    description: string;
    platformUsed: string;
    cryptoType: string;
    scammerDetails: {
      name: string;
      platform: string;
      contactInfo: string;
      walletAddress: string;
      otherDetails: string;
    };
    transactionDetails: {
      amountLost: number;
      investmentPromised: number;
      websiteURL: string;
      communicationMethod: string;
    };
    scamIndicators: {
      fakeWebsite: boolean;
      fakeInvestment: boolean;
      ponziScheme: boolean;
      miningScam: boolean;
      walletCompromised: boolean;
      exchangeCompromised: boolean;
    };
    actionsStatus: {
      bankInformed: boolean;
      policeReported: boolean;
    };
    actionsTaken: string;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }

  export interface EmploymentScamReport extends BaseReport {
    type: 'employment-scam';
    scamType: string;
    dateOfIncident: string;
    description: string;
    companyDetails: {
      companyName: string;
      jobTitle: string;
      websiteURL: string;
      jobPostingPlatform: string;
      promisedSalary: number;
    };
    scammerDetails: {
      name: string;
      email: string;
      phone: string;
      position: string;
      otherDetails: string;
    };
    documentsSubmitted: {
      documentType: string;
      submissionDate: string;
      details: string;
    }[];
    financialDetails: {
      amountLost: number;
      recruitmentFees: number;
      paymentMethod: string;
    };
    scamIndicators: {
      interviewConducted: boolean;
      paymentRequested: boolean;
      documentsRequested: boolean;
      personalInfoShared: boolean;
      bankDetailsShared: boolean;
      contractReceived: boolean;
    };
    communicationMethod: string;
    policeReported: boolean;
    actionsTaken: string;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }
  
  // Add this interface along with the existing types
  export interface EmergencyReport {
    _id: string;
    caseNumber: string;
    name: string;
    contact: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    location: {
      latitude: number;
      longitude: number;
    };
    files: Array<{
      fileName: string;
      fileData: string;  // Added this field
      fileType: string;
      uploadDate: Date;
      _id?: string;      // Added this optional field
    }>;
    status: 'pending' | 'in-progress' | 'resolved';
    statusMessage: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface CrimeReport {
    caseNumber: string;
    name: string;
    contact: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    location: {
      latitude: number;
      longitude: number;
    };
    files: Array<{
      fileName: string;
      fileData: string;
      fileType: string;
      uploadDate: Date;
    }>;
    status: 'pending' | 'in-progress' | 'resolved';
    statusMessage: string;
    createdAt: Date;
    updatedAt: Date;

  }
  
  

  
  export interface FinancialFraudReport extends BaseReport {
    type: 'financial-fraud';
    fraudType: string;
    bankDetails: {
      bankName: string;
      accountType: string;
    };
    dateDiscovered: string;
    description: string;
    fraudsterDetails: {
      suspectedPerpetrator: string;
      fraudsterAccount: string;
      communicationMethod: string;
      otherDetails: string;
    };
    transactionDetails: {
      amountLost: number;
      transactionDate: string;
      transactionType: string;
      details: string;
    };
    fraudIndicators: {
      accountCompromised: boolean;
      cardCompromised: boolean;
      checkFraud: boolean;
      loanFraud: boolean;
      transferFraud: boolean;
    };
    recoveryStatus: {
      recoveryAttempted: boolean;
      recoveryAmount: number;
      bankResponse: string;
    };
    actionsStatus: {
      bankInformed: boolean;
      policeReported: boolean;
    };
    actionsTaken: string;
    affectedServices: {
      serviceName: string;
      dateAffected: string;
      status: string;
    }[];
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }

  export interface OtherFraudReport extends BaseReport {
    type: 'other-fraud';
    fraudCategory: string;
    dateOfIncident: string;
    description: string;
    methodDetails: {
      methodUsed: string;
      platformUsed: string;
      fraudTechniques: string[];
    };
    perpetratorDetails: {
      name: string;
      contactMethod: string;
      otherDetails: string;
    };
    impactDetails: {
      amountLost: number;
      victimImpact: string;
      otherVictims: boolean;
    };
    preventiveMeasures: {
      actionsTaken: string;
      preventiveSuggestions: string;
      additionalDetails: string;
    };
    actionsStatus: {
      policeReported: boolean;
    };
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: string;
    };
  }
  
  export interface EvidenceFile {
    fileName: string;
    fileData: string;
    fileType: string;
    uploadDate: string;
    _id: string;
  }
  
  export interface Evidence {
    files: EvidenceFile[];
    status: string;
  }
  // Add other report interfaces here
  // export interface WhatsAppReport extends BaseReport {...}
  // export interface CryptoReport extends BaseReport {...}
  