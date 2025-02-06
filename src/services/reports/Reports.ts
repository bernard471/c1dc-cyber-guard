import { MomoReport } from './types';

export const fetchMomoReports = async (): Promise<MomoReport[]> => {
  const response = await fetch('/api/momo-fraud');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: MomoReport) => ({
      ...report,
      type: 'momo'
    }));  }
  return [];
};

import { WhatsAppReport } from './types';

export const fetchWhatsAppReports = async (): Promise<WhatsAppReport[]> => {
  const response = await fetch('/api/whatsapp-hack');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: WhatsAppReport) => ({
      ...report,
      type: 'whatsapp'
    }));
  }
  return [];
};

import { SocialAccountReport } from './types';

export const fetchSocialAccountReports = async (): Promise<SocialAccountReport[]> => {
  const response = await fetch('/api/social-media-hack');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: SocialAccountReport) => ({
      ...report,
      type: 'social-account'
    }));
  }
  return [];
};

import { SextortionReport } from './types';

export const fetchSextortionReports = async (): Promise<SextortionReport[]> => {
  const response = await fetch('/api/sextortion');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: SextortionReport) => ({
      ...report,
      type: 'sextortion'
    }));
  }
  return [];
};

import { EmailHackReport } from './types';

export const fetchEmailHackReports = async (): Promise<EmailHackReport[]> => {
  const response = await fetch('/api/email-hack');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: EmailHackReport) => ({
      ...report,
      type: 'email-hack'
    }));
  }
  return [];
};

import { LocationTrackingReport } from './types';

export const fetchLocationTrackingReports = async (): Promise<LocationTrackingReport[]> => {
  const response = await fetch('/api/location-tracking');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: LocationTrackingReport) => ({
      ...report,
      type: 'location-tracking'
    }));
  }
  return [];
};

import { IdentityTheftReport } from './types';

export const fetchIdentityTheftReports = async (): Promise<IdentityTheftReport[]> => {
  const response = await fetch('/api/identity-theft');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: IdentityTheftReport) => ({
      ...report,
      type: 'identity-theft'
    }));
  }
  return [];
};

import { ShoppingScamReport } from './types';

export const fetchShoppingScamReports = async (): Promise<ShoppingScamReport[]> => {
  const response = await fetch('/api/shopping-scam');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: ShoppingScamReport) => ({
      ...report,
      type: 'shopping-scam'
    }));
  }
  return [];
};

import { CryptoScamReport } from './types';

export const fetchCryptoScamReports = async (): Promise<CryptoScamReport[]> => {
  const response = await fetch('/api/crypto-scam');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: CryptoScamReport) => ({
      ...report,
      type: 'crypto-scam'
    }));
  }
  return [];
};

import { EmploymentScamReport } from './types';

export const fetchEmploymentScamReports = async (): Promise<EmploymentScamReport[]> => {
  const response = await fetch('/api/employment-scam');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: EmploymentScamReport) => ({
      ...report,
      type: 'employment-scam'
    }));
  }
  return [];
};

import { FinancialFraudReport } from './types';

export const fetchFinancialFraudReports = async (): Promise<FinancialFraudReport[]> => {
  const response = await fetch('/api/financial-fraud');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: FinancialFraudReport) => ({
      ...report,
      type: 'financial-fraud'
    }));
  }
  return [];
};

import { OtherFraudReport } from './types';

export const fetchOtherFraudReports = async (): Promise<OtherFraudReport[]> => {
  const response = await fetch('/api/other-fraud');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: OtherFraudReport) => ({
      ...report,
      type: 'other-fraud'
    }));
  }
  return [];
};

import { EmergencyReport } from './types';

export const fetchEmergencyReports = async (): Promise<EmergencyReport[]> => {
  const response = await fetch('/api/emergency-reports');
  const data = await response.json();
  
  if (data.success) {
    return data.data.map((report: EmergencyReport) => ({
      ...report,
      type: 'emergency'
    }));
  }
  return [];
};



// Add other report fetching functions here
// export const fetchWhatsAppReports = async () => {...}
// export const fetchCryptoReports = async () => {...}
