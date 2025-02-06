import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


interface SocialMediaHackFormData {
  platform: string;
  username: string;
  accountEmail: string;
  accountPhone: string;
  hackMethod: string;
  dateOfHack: string;
  description: string;
  suspectedPerpetrator: string;
  accountStatus: string;
  evidenceFiles: File[];
  recoveryAttempted: boolean;
  postsCompromised: boolean;
  messagesAccessed: boolean;
  followersLost: number;
  financialLoss: string;
  twoFactorEnabled: boolean;
  emailCompromised: boolean;
  isAnonymous: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
}

const initialFormData: SocialMediaHackFormData = {
  platform: '',
  username: '',
  accountEmail: '',
  accountPhone: '',
  hackMethod: '',
  dateOfHack: '',
  description: '',
  suspectedPerpetrator: '',
  accountStatus: '',
  evidenceFiles: [] as File[],
  recoveryAttempted: false,
  postsCompromised: false,
  messagesAccessed: false,
  followersLost: 0,
  financialLoss: '',
  twoFactorEnabled: false,
  emailCompromised: false,
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
        <h3 className="text-xl font-bold mb-4">Report Submitted Successfully!</h3>
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

export const SocialMediaHackForm = ({ formData = initialFormData, setFormData }: {
  formData: SocialMediaHackFormData;
  setFormData: (data: SocialMediaHackFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.platform) newErrors.platform = 'Platform is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.accountPhone) newErrors.accountPhone = 'Account phone is required';
    if (!formData.accountEmail) newErrors.accountEmail = 'Account email is required';
    if (!formData.hackMethod) newErrors.hackMethod = 'Hack method is required';
    if (!formData.dateOfHack) newErrors.dateOfHack = 'Date of hack is required';
    if (!formData.description) newErrors.description = 'Description is required';


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
      const response = await fetch('/api/social-media-hack', {
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

  const handleEvidenceUpload = () => {
    router.push('/evidence-page');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Media Platform
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={(e) => setFormData({...formData, platform: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Platform</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter/X</option>
            <option value="tiktok">TikTok</option>
            <option value="snapchat">Snapchat</option>
            <option value="linkedin">LinkedIn</option>
            <option value="other">Other</option>
          </select>
          {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform}</p>}
        </div>

        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username/Handle
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your account username"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Email
          </label>
          <input
            type="text"
            name="accountEmail"
            value={formData.accountEmail}
            onChange={(e) => setFormData({...formData, accountEmail: e.target.value})}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your account accountEmail"
          />
          {errors.accountEmail && <p className="text-red-500 text-sm mt-1">{errors.accountEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Phonenumber
          </label>
          <input
            type="text"
            name="accountPhone"
            value={formData.accountPhone}
            onChange={(e) => setFormData({...formData, accountPhone: e.target.value})}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your account accountPhone"
          />
          {errors.accountPhone && <p className="text-red-500 text-sm mt-1">{errors.accountPhone}</p>}
        </div>

        {/* Hack Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Hack
          </label>
          <select
            name="hackMethod"
            value={formData.hackMethod}
            onChange={(e) => setFormData({...formData, hackMethod: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Hack Method</option>
            <option value="phishing">Phishing Attack</option>
            <option value="passwordBreach">Password Breach</option>
            <option value="impersonation">Account Impersonation</option>
            <option value="malware">Malware/Spyware</option>
            <option value="socialEngineering">Social Engineering</option>
            <option value="bruteForce">Brute Force Attack</option>
            <option value="other">Other</option>
          </select>
          {errors.hackMethod && <p className="text-red-500 text-sm mt-1">{errors.hackMethod}</p>}
        </div>

        {/* Date of Hack */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Hack
          </label>
          <input
            type="date"
            name="dateOfHack"
            value={formData.dateOfHack}
            onChange={(e) => setFormData({...formData, dateOfHack: e.target.value})}
            className="w-full p-2 border rounded-lg"
          />
          {errors.dateOfHack && <p className="text-red-500 text-sm mt-1">{errors.dateOfHack}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
            className="w-full p-2 border rounded-lg"
            placeholder="Describe how the hack occurred and what happened..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Account Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Account Status
          </label>
          <select
            name="accountStatus"
            value={formData.accountStatus}
            onChange={(e) => setFormData({...formData, accountStatus: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Status</option>
            <option value="locked">Locked Out</option>
            <option value="recovered">Recovered</option>
            <option value="compromised">Still Compromised</option>
            <option value="deleted">Deleted</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Checkboxes */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.recoveryAttempted}
              onChange={(e) => setFormData({...formData, recoveryAttempted: e.target.checked})}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Recovery Steps Attempted</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.postsCompromised}
              onChange={(e) => setFormData({...formData, postsCompromised: e.target.checked})}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Posts Were Compromised/Modified</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.messagesAccessed}
              onChange={(e) => setFormData({...formData, messagesAccessed: e.target.checked})}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Private Messages Were Accessed</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.twoFactorEnabled}
              onChange={(e) => setFormData({...formData, twoFactorEnabled: e.target.checked})}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Two-Factor Authentication Was Enabled</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.emailCompromised}
              onChange={(e) => setFormData({...formData, emailCompromised: e.target.checked})}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Associated Email Was Also Compromised</label>
          </div>
        </div>

        {/* Followers Lost */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            FollowersLost Loss (if you suspect any) 
          </label>
          <input
            type="number"
            name="followersLost"
            value={formData.followersLost}
            onChange={(e) => setFormData({...formData, followersLost: Number(e.target.value)})}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter estimated number of followers lost if money was lost"
          />
        </div>

        {/* Financial Loss */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Financial Loss (if any)
          </label>
          <input
            type="number"
            name="financialLoss"
            value={formData.financialLoss}
            onChange={(e) => setFormData({...formData, financialLoss: e.target.value})}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter amount if money was lost"
          />
        </div>

        {/* Anonymous Report Option */}
        <div>
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
          <p className="mt-1 text-xs text-gray-500">
            When submitting anonymously, your personal information will be hidden from public view
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Contact Information
          </label>
          
          <div>
            <input
              type="text"
              name="name"
              value={formData.contactInfo?.name || ''}
              onChange={(e) => setFormData({
                ...formData,
                contactInfo: { ...formData.contactInfo, name: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="Your Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.contactInfo?.email || ''}
              onChange={(e) => setFormData({
                ...formData,
                contactInfo: { ...formData.contactInfo, email: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="Your Email"
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.contactInfo?.phone || ''}
              onChange={(e) => setFormData({
                ...formData,
                contactInfo: { ...formData.contactInfo, phone: e.target.value }
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Your Phone Number"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Method
            </label>
            <select
            value={formData.contactInfo.contactPreference}
            onChange={(e) => setFormData({
                ...formData,
                contactInfo: { 
                ...formData.contactInfo, 
                contactPreference: e.target.value as 'email' | 'phone' | 'whatsapp'
                }
            })}
            className="w-full p-2 border rounded-lg"
            >
            <option value="email">Email</option>
            <option value="phone">Phone Call</option>
            <option value="whatsapp">WhatsApp</option>
            </select>
        </div>
        </div>
        <div className="mt-6">
        <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
            {formData.isAnonymous ? 'Submit Anonymous Report' : 'Submit Momo Fraud Report'}
        </button>
    </div>
        </div>
</form>

{showSuccessPopup && (
    <SuccessPopup
      reportId={reportId}
      onClose={() => setShowSuccessPopup(false)}
      onEvidenceUpload={handleEvidenceUpload}
    />
  )}

</>
);
};
