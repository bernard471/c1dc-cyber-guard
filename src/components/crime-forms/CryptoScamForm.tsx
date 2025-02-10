import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CryptoScamFormData {
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
  evidenceFiles: File[];
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
  isAnonymous: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
}

const initialFormData: CryptoScamFormData = {
  scamType: '',
  dateOfIncident: '',
  description: '',
  platformUsed: '',
  cryptoType: '',
  scammerDetails: {
    name: '',
    platform: '',
    contactInfo: '',
    walletAddress: '',
    otherDetails: ''
  },
  evidenceFiles: [],
  transactionDetails: {
    amountLost: 0,
    investmentPromised: 0,
    websiteURL: '',
    communicationMethod: ''
  },
  scamIndicators: {
    fakeWebsite: false,
    fakeInvestment: false,
    ponziScheme: false,
    miningScam: false,
    walletCompromised: false,
    exchangeCompromised: false
  },
  actionsStatus: {
    bankInformed: false,
    policeReported: false
  },
  actionsTaken: '',
  isAnonymous: false,
  contactInfo: {
    name: '',
    email: '',
    phone: '',
    contactPreference: 'email'
  }
};

interface SuccessPopupProps {
  reportId: string;
  onClose: () => void;
  onEvidenceUpload: () => void;
}

const SuccessPopup = ({ reportId, onClose, onEvidenceUpload }: SuccessPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Crypto Scam Report Submitted Successfully!</h3>
        <p className="mb-4">Your report ID is:</p>
        <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center mb-6">
          <code className="font-mono">{reportId}</code>
          <button
            onClick={() => navigator.clipboard.writeText(reportId)}
            className="text-blue-500 hover:text-blue-700"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={onEvidenceUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Upload Evidence (Optional)
          </button>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export const CryptoScamForm = ({ formData = initialFormData, setFormData }: {
  formData: CryptoScamFormData;
  setFormData: (data: CryptoScamFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.scamType) newErrors.scamType = 'Scam type is required';
    if (!formData.dateOfIncident) newErrors.dateOfIncident = 'Date of incident is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.platformUsed) newErrors.platformUsed = 'Platform is required';
    if (!formData.cryptoType) newErrors.cryptoType = 'Cryptocurrency type is required';
    if (!formData.scammerDetails.walletAddress) newErrors.walletAddress = 'Wallet address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      const response = await fetch('/api/crypto-scam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (data.success) {
        setReportId(data.data.reportId);
        setShowSuccessPopup(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

 

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Scam Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Cryptocurrency Scam
          </label>
          <select
            value={formData.scamType}
            onChange={(e) => setFormData({...formData, scamType: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Scam Type</option>
            <option value="investment">Fake Investment Scheme</option>
            <option value="mining">Mining Scam</option>
            <option value="ponzi">Ponzi/Pyramid Scheme</option>
            <option value="wallet">Wallet Theft</option>
            <option value="exchange">Fake Exchange</option>
            <option value="token">Fake Token/ICO</option>
            <option value="giveaway">Giveaway Scam</option>
            <option value="other">Other</option>
          </select>
          {errors.scamType && <p className="text-red-500 text-sm mt-1">{errors.scamType}</p>}
        </div>

        {/* Date of Incident */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Date of Incident
  </label>
  <input
    type="date"
    value={formData.dateOfIncident}
    onChange={(e) => setFormData({...formData, dateOfIncident: e.target.value})}
    className="w-full p-2 border rounded-lg"
  />
  {errors.dateOfIncident && <p className="text-red-500 text-sm mt-1">{errors.dateOfIncident}</p>}
</div>

{/* Description */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Incident Description
  </label>
  <textarea
    value={formData.description}
    onChange={(e) => setFormData({...formData, description: e.target.value})}
    className="w-full p-2 border rounded-lg h-32"
    placeholder="Please describe what happened with the crypto scam..."
  />
  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
</div>

{/* Platform Used */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Platform Used
  </label>
  <select
    value={formData.platformUsed}
    onChange={(e) => setFormData({...formData, platformUsed: e.target.value})}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Platform</option>
    <option value="telegram">Telegram</option>
    <option value="whatsapp">WhatsApp</option>
    <option value="website">Website</option>
    <option value="exchange">Crypto Exchange</option>
    <option value="social">Social Media</option>
    <option value="other">Other</option>
  </select>
  {errors.platformUsed && <p className="text-red-500 text-sm mt-1">{errors.platformUsed}</p>}
</div>

{/* Cryptocurrency Type */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Cryptocurrency Type
  </label>
  <select
    value={formData.cryptoType}
    onChange={(e) => setFormData({...formData, cryptoType: e.target.value})}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Cryptocurrency</option>
    <option value="bitcoin">Bitcoin (BTC)</option>
    <option value="ethereum">Ethereum (ETH)</option>
    <option value="usdt">Tether (USDT)</option>
    <option value="bnb">BNB</option>
    <option value="other">Other</option>
  </select>
  {errors.cryptoType && <p className="text-red-500 text-sm mt-1">{errors.cryptoType}</p>}
</div>

{/* Actions Taken */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Actions Taken So Far
  </label>
  <textarea
    value={formData.actionsTaken}
    onChange={(e) => setFormData({...formData, actionsTaken: e.target.value})}
    className="w-full p-2 border rounded-lg h-32"
    placeholder="Describe what steps you've taken to address this scam..."
  />
</div>


        {/* Scammer Details Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Scammer Details</label>
          <input
            type="text"
            value={formData.scammerDetails.name}
            onChange={(e) => setFormData({
              ...formData,
              scammerDetails: {...formData.scammerDetails, name: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Scammer's Name/Username (if known)"
          />
          <input
            type="text"
            value={formData.scammerDetails.platform}
            onChange={(e) => setFormData({
              ...formData,
              scammerDetails: {...formData.scammerDetails, platform: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Platform/Website Used"
          />
          <input
            type="text"
            value={formData.scammerDetails.contactInfo}
            onChange={(e) => setFormData({
              ...formData,
              scammerDetails: {...formData.scammerDetails, contactInfo: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Contact Information"
          />
          <input
            type="text"
            value={formData.scammerDetails.walletAddress}
            onChange={(e) => setFormData({
              ...formData,
              scammerDetails: {...formData.scammerDetails, walletAddress: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Cryptocurrency Wallet Address"
          />
        </div>

        {/* Transaction Details Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Transaction Details</label>
          <input
            type="number"
            value={formData.transactionDetails.amountLost}
            onChange={(e) => setFormData({
              ...formData,
              transactionDetails: {...formData.transactionDetails, amountLost: Number(e.target.value)}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Amount Lost (USD)"
          />
          <input
            type="number"
            value={formData.transactionDetails.investmentPromised}
            onChange={(e) => setFormData({
              ...formData,
              transactionDetails: {...formData.transactionDetails, investmentPromised: Number(e.target.value)}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Promised Return on Investment (%)"
          />
          <input
            type="url"
            value={formData.transactionDetails.websiteURL}
            onChange={(e) => setFormData({
              ...formData,
              transactionDetails: {...formData.transactionDetails, websiteURL: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Website URL"
          />
        </div>

        {/* Scam Indicators */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Scam Indicators</label>
          {[
            { key: 'fakeWebsite', label: 'Fake Website/Platform' },
            { key: 'fakeInvestment', label: 'Fake Investment Scheme' },
            { key: 'ponziScheme', label: 'Ponzi/Pyramid Scheme' },
            { key: 'miningScam', label: 'Mining Scam' },
            { key: 'walletCompromised', label: 'Wallet Was Compromised' },
            { key: 'exchangeCompromised', label: 'Exchange Account Compromised' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.scamIndicators[key as keyof typeof formData.scamIndicators]}
                onChange={(e) => setFormData({
                  ...formData,
                  scamIndicators: {...formData.scamIndicators, [key]: e.target.checked}
                })}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="ml-2">{label}</label>
            </div>
          ))}
        </div>

        {/* Actions Status */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Actions Taken</label>
          {[
            { key: 'bankInformed', label: 'Bank/Payment Provider Informed' },
            { key: 'policeReported', label: 'Reported to Police' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.actionsStatus[key as keyof typeof formData.actionsStatus]}
                onChange={(e) => setFormData({
                  ...formData,
                  actionsStatus: {...formData.actionsStatus, [key]: e.target.checked}
                })}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="ml-2">{label}</label>
            </div>
          ))}
        </div>

        {/* Anonymous Reporting Option */}
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Submit this report anonymously</span>
          </label>
        </div>

        {/* Contact Information Section */}
        {!formData.isAnonymous && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Contact Information</label>
            <input
              type="text"
              value={formData.contactInfo.name}
              onChange={(e) => setFormData({
                ...formData,
                contactInfo: {...formData.contactInfo, name: e.target.value}
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="Your Name"
            />
            <input
              type="email"
              value={formData.contactInfo.email}
              onChange={(e) => setFormData({
                ...formData,
                contactInfo: {...formData.contactInfo, email: e.target.value}
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="Your Email"
            />
            <input
              type="tel"
              value={formData.contactInfo.phone}
              onChange={(e) => setFormData({
                ...formData,
                contactInfo: {...formData.contactInfo, phone: e.target.value}
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="Your Phone Number"
            />
            <select
              value={formData.contactInfo.contactPreference}
              onChange={(e) => setFormData({
                ...formData,
                contactInfo: {...formData.contactInfo, contactPreference: e.target.value as 'email' | 'phone' | 'whatsapp'}
              })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="email">Contact via Email</option>
              <option value="phone">Contact via Phone</option>
              <option value="whatsapp">Contact via WhatsApp</option>
            </select>
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {formData.isAnonymous ? 'Submit Anonymous Report' : 'Submit Crypto Scam Report'}
          </button>
        </div>
      </form>

      {showSuccessPopup && (
        <SuccessPopup
          reportId={reportId}
          onClose={() => setShowSuccessPopup(false)}
          onEvidenceUpload={() => router.push('/evidence-page')}
        />
      )}
    </>
  );
};
