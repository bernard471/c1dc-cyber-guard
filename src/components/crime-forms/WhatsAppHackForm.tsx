import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface WhatsAppHackFormData {
  phoneNumber: string;
  hackMethod: string;
  dateOfHack: string;
  description: string;
  suspectedPerpetrator: string;
  accountAccess: string;
  evidenceFiles: File[];
  recoveryAttempted: boolean;
  messagesCompromised: boolean;
  contactsAffected: boolean;
  financialLoss: string;
  twoFactorEnabled: boolean;
  isAnonymous: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
}

const initialFormData: WhatsAppHackFormData = {
  phoneNumber: '',
  hackMethod: '',
  dateOfHack: '',
  description: '',
  suspectedPerpetrator: '',
  accountAccess: '',
  evidenceFiles: [] as File[],
  recoveryAttempted: false,
  messagesCompromised: false,
  contactsAffected: false,
  financialLoss: '',
  twoFactorEnabled: false,
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

export const WhatsAppHackForm = ({ formData = initialFormData, setFormData }: {
  formData: WhatsAppHackFormData;
  setFormData: (data: WhatsAppHackFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.hackMethod) newErrors.hackMethod = 'Hack method is required';
    if (!formData.dateOfHack) newErrors.dateOfHack = 'Date of hack is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.accountAccess) newErrors.accountAccess = 'Account status is required';

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
      const response = await fetch('/api/whatsapp-hack', {
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
          Affected WhatsApp Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your WhatsApp number"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
      </div>

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
          <option value="verification">Verification Code Theft</option>
          <option value="cloning">Account Cloning</option>
          <option value="phishing">Phishing Attack</option>
          <option value="malware">Malware/Spyware</option>
          <option value="social">Social Engineering</option>
          <option value="other">Other</option>
        </select>
        {errors.hackMethod && <p className="text-red-500 text-sm mt-1">{errors.hackMethod}</p>}
      </div>

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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Suspected Perpetrator Information
        </label>
        <input
          type="text"
          name="suspectedPerpetrator"
          value={formData.suspectedPerpetrator}
          onChange={(e) => setFormData({...formData, suspectedPerpetrator: e.target.value})}
          className="w-full p-2 border rounded-lg"
          placeholder="Any known information about the hacker"
        />
        {errors.suspectedPerpetrator && <p className="text-red-500 text-sm mt-1">{errors.suspectedPerpetrator}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Account Status
        </label>
        <select
          name="accountAccess"
          value={formData.accountAccess}
          onChange={(e) => setFormData({...formData, accountAccess: e.target.value})}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select Status</option>
          <option value="locked">Locked Out</option>
          <option value="recovered">Recovered</option>
          <option value="compromised">Still Compromised</option>
          <option value="deactivated">Deactivated</option>
        </select>
          {errors.accountAccess && <p className="text-red-500 text-sm mt-1">{errors.accountAccess}</p>}
      </div>

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
            checked={formData.messagesCompromised}
            onChange={(e) => setFormData({...formData, messagesCompromised: e.target.checked})}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label className="ml-2">Messages Were Compromised</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.contactsAffected}
            onChange={(e) => setFormData({...formData, contactsAffected: e.target.checked})}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label className="ml-2">Contacts Were Affected</label>
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
      </div>

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
