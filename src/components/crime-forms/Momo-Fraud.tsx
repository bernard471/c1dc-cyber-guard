import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface MomoFraudFormData {
    momoNumber: string;
    transactionId: string;
    provider: string;
    amount: string;
    dateOfTransaction: string;
    description: string;
    evidenceFiles: File[];
    fraudsterNumber: string;
    fraudsterName: string;
    isAnonymous: boolean;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
      contactPreference: 'email' | 'phone' | 'whatsapp';
    };
  }
  
  // Update the initial form state
  const initialFormData: MomoFraudFormData = {
    momoNumber: '',
    transactionId: '',
    provider: '',
    amount: '',
    dateOfTransaction: '',
    description: '',
    evidenceFiles: [],
    fraudsterNumber: '',
    fraudsterName: '',
    isAnonymous: false,
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      contactPreference: 'email',
    }
  };
  
  // Add this interface for the popup data
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
  
export const MomoFraud = ({ formData = initialFormData, setFormData }: {
  formData: MomoFraudFormData;
  setFormData: (data: MomoFraudFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.provider) newErrors.provider = 'Please select a provider';
    if (!formData.momoNumber) newErrors.momoNumber = 'Mobile money number is required';
    if (!formData.transactionId) newErrors.transactionId = 'Transaction ID is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (!formData.fraudsterNumber) newErrors.fraudsterNumber = 'Fraudster number is required';
    if (!formData.fraudsterName) newErrors.fraudsterName = 'Fraudster name is required';
    if (!formData.dateOfTransaction) newErrors.dateOfTransaction = 'Date of transaction is required';
    if (!formData.description) newErrors.description = 'Description is required';

    if (!formData.isAnonymous) {
      if (!formData.contactInfo.name) newErrors.name = 'Name is required';
      if (!formData.contactInfo.email) newErrors.email = 'Email is required';
      if (!formData.contactInfo.phone) newErrors.phone = 'Phone number is required';
    }

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
      const response = await fetch('/api/momo-fraud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        setReportId(data.data.reportId); // Updated to match API response structure
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
    <form onSubmit={handleSubmit} className="flex-1 overflow-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Money Provider
        </label>
        <select
          name="provider"
          value={formData.provider}
          onChange={(e) => setFormData({...formData, provider: e.target.value})}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select Provider</option>
          <option value="mtn">MTN Mobile Money</option>
          <option value="airtel">Airtel Money</option>
          <option value="telecel">Telecel Cash</option>
          <option value="other">Other</option>
        </select>
      {errors.provider && (
          <p className="mt-1 text-sm text-red-500">{errors.provider}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Mobile Money Number
        </label>
        <input
          type="tel"
          name="momoNumber"
          value={formData.momoNumber}
          onChange={(e) => setFormData({...formData, momoNumber: e.target.value})}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your MoMo number"
        />
        {errors.momoNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.momoNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        Fraudster&apos;s Mobile Money Number
        </label>
        <input
          type="tel"
          name="fraudsterNumber"
          value={formData.fraudsterNumber}
          onChange={(e) => setFormData({...formData, fraudsterNumber: e.target.value})}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter fraudster's number if available"
        />
        {errors.fraudsterNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.fraudsterNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fraudster&apos;s Name (if known)
        </label>
        <input
          type="text"
          name="fraudsterName"
          value={formData.fraudsterName}
          onChange={(e) => setFormData({...formData, fraudsterName: e.target.value})}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter fraudster's name if known"
        />
        {errors.fraudsterName && (
          <p className="mt-1 text-sm text-red-500">{errors.fraudsterName}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transaction ID
        </label>
        <input
          type="text"
          name="transactionId"
          value={formData.transactionId}
          onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter transaction ID"
        />
        {errors.transactionId && (
          <p className="mt-1 text-sm text-red-500">{errors.transactionId}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount Lost
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter amount in GHS"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date of Transaction
        </label>
        <input
          type="date"
          name="dateOfTransaction"
          value={formData.dateOfTransaction}
          onChange={(e) => setFormData({...formData, dateOfTransaction: e.target.value})}
          className="w-full p-2 border rounded-lg"
        />
        {errors.dateOfTransaction && (
          <p className="mt-1 text-sm text-red-500">{errors.dateOfTransaction}</p>
        )}
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
          placeholder="Please describe how the fraud occurred..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
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
