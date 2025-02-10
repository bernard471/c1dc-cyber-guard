import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EmailHackFormData {
  emailAddress: string;
  emailProvider: string;
  emailPhone: string;
  hackMethod: string;
  dateOfHack: string;
  description: string;
  suspectedPerpetrator: string;
  accountStatus: string;
  evidenceFiles: File[];
  recoveryAttempted: boolean;
  emailsCompromised: boolean;
  contactsAffected: boolean;
  passwordChanged: boolean;
  financialLoss: number;
  twoFactorEnabled: boolean;
  linkedAccountsAffected: boolean;
  recoveryEmailCompromised: boolean;
  isAnonymous: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
}

const initialFormData: EmailHackFormData = {
  emailAddress: '',
  emailProvider: '',
  emailPhone: '',
  hackMethod: '',
  dateOfHack: '',
  description: '',
  suspectedPerpetrator: '',
  accountStatus: '',
  evidenceFiles: [],
  recoveryAttempted: false,
  emailsCompromised: false,
  contactsAffected: false,
  passwordChanged: false,
  financialLoss: 0,
  twoFactorEnabled: false,
  linkedAccountsAffected: false,
  recoveryEmailCompromised: false,
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
        <h3 className="text-xl font-bold mb-4">Email Hack Report Submitted Successfully!</h3>
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

export const EmailHackForm = ({ formData = initialFormData, setFormData }: {
  formData: EmailHackFormData;
  setFormData: (data: EmailHackFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.emailAddress) newErrors.emailAddress = 'Email address is required';
    if (!formData.emailProvider) newErrors.emailProvider = 'Email provider is required';
    if (!formData.emailPhone) newErrors.emailPhone = 'Phone number is required';
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
      const response = await fetch('/api/email-hack', {
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Affected Email Address
          </label>
          <input
            type="email"
            value={formData.emailAddress}
            onChange={(e) => setFormData({...formData, emailAddress: e.target.value})}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your email address"
          />
          {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Provider
          </label>
          <select
            value={formData.emailProvider}
            onChange={(e) => setFormData({...formData, emailProvider: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Provider</option>
            <option value="gmail">Gmail</option>
            <option value="yahoo">Yahoo Mail</option>
            <option value="outlook">Outlook/Hotmail</option>
            <option value="proton">ProtonMail</option>
            <option value="icloud">iCloud Mail</option>
            <option value="workplace">Workplace Email</option>
            <option value="other">Other</option>
          </select>
          {errors.emailProvider && <p className="text-red-500 text-sm mt-1">{errors.emailProvider}</p>}
        </div>

        {/* Hack Method */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    How Was Your Email Hacked?
  </label>
  <select
    value={formData.hackMethod}
    onChange={(e) => setFormData({...formData, hackMethod: e.target.value})}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Hack Method</option>
    <option value="phishing">Phishing Attack</option>
    <option value="password">Password Compromise</option>
    <option value="device">Device Compromise</option>
    <option value="malware">Malware/Virus</option>
    <option value="unknown">Unknown</option>
    <option value="other">Other</option>
  </select>
  {errors.hackMethod && <p className="text-red-500 text-sm mt-1">{errors.hackMethod}</p>}
</div>

{/* Date of Hack */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    When Did the Hack Occur?
  </label>
  <input
    type="date"
    value={formData.dateOfHack}
    onChange={(e) => setFormData({...formData, dateOfHack: e.target.value})}
    className="w-full p-2 border rounded-lg"
  />
  {errors.dateOfHack && <p className="text-red-500 text-sm mt-1">{errors.dateOfHack}</p>}
</div>

{/* Description */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Detailed Description of the Incident
  </label>
  <textarea
    value={formData.description}
    onChange={(e) => setFormData({...formData, description: e.target.value})}
    className="w-full p-2 border rounded-lg h-32"
    placeholder="Please describe what happened and any suspicious activities noticed..."
  />
  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
</div>

{/* Suspected Perpetrator */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Suspected Perpetrator (if known)
  </label>
  <input
    type="text"
    value={formData.suspectedPerpetrator}
    onChange={(e) => setFormData({...formData, suspectedPerpetrator: e.target.value})}
    className="w-full p-2 border rounded-lg"
    placeholder="Enter any information about suspected perpetrator"
  />
</div>

{/* Account Status */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Current Account Status
  </label>
  <select
    value={formData.accountStatus}
    onChange={(e) => setFormData({...formData, accountStatus: e.target.value})}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Account Status</option>
    <option value="locked">Locked Out</option>
    <option value="recovered">Recovered</option>
    <option value="compromised">Still Compromised</option>
    <option value="unknown">Unknown</option>
  </select>
</div>

{/* Financial Loss */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Financial Loss Amount (if any)
  </label>
  <input
    type="number"
    value={formData.financialLoss}
    onChange={(e) => setFormData({...formData, financialLoss: Number(e.target.value)})}
    className="w-full p-2 border rounded-lg"
    min="0"
    placeholder="Enter amount in your local currency"
  />
</div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recovery Phone Number
          </label>
          <input
            type="tel"
            value={formData.emailPhone}
            onChange={(e) => setFormData({...formData, emailPhone: e.target.value})}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter recovery phone number"
          />
          {errors.emailPhone && <p className="text-red-500 text-sm mt-1">{errors.emailPhone}</p>}
        </div>

        {/* Add all the checkbox fields */}
        <div className="space-y-4">
          {[
            { key: 'recoveryAttempted', label: 'Recovery Steps Attempted' },
            { key: 'emailsCompromised', label: 'Emails Were Accessed/Deleted' },
            { key: 'contactsAffected', label: 'Contacts Were Affected' },
            { key: 'passwordChanged', label: 'Password Was Changed by Hacker' },
            { key: 'twoFactorEnabled', label: 'Two-Factor Authentication Was Enabled' },
            { key: 'linkedAccountsAffected', label: 'Linked Accounts Were Affected' },
            { key: 'recoveryEmailCompromised', label: 'Recovery Email Was Also Compromised' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={formData[key as keyof EmailHackFormData] as boolean}
                onChange={(e) => setFormData({...formData, [key]: e.target.checked})}
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
            {formData.isAnonymous ? 'Submit Anonymous Report' : 'Submit Email Hack Report'}
          </button>
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

