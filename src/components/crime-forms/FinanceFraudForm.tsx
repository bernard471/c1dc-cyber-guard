import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FinancialFraudFormData {
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
  };
  evidenceFiles: File[];
  transactionDetails: {
    amountLost: number;
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
  affectedServices: string[];
  isAnonymous: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
}

const initialFormData: FinancialFraudFormData = {
  fraudType: '',
  bankDetails: {
    bankName: '',
    accountType: ''
  },
  dateDiscovered: '',
  description: '',
  fraudsterDetails: {
    suspectedPerpetrator: '',
    fraudsterAccount: '',
    communicationMethod: ''
  },
  evidenceFiles: [],
  transactionDetails: {
    amountLost: 0,
    details: ''
  },
  fraudIndicators: {
    accountCompromised: false,
    cardCompromised: false,
    checkFraud: false,
    loanFraud: false,
    transferFraud: false
  },
  recoveryStatus: {
    recoveryAttempted: false,
    recoveryAmount: 0,
    bankResponse: ''
  },
  actionsStatus: {
    bankInformed: false,
    policeReported: false
  },
  actionsTaken: '',
  affectedServices: [],
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
        <h3 className="text-xl font-bold mb-4">Financial Fraud Report Submitted!</h3>
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
            Upload Evidence
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

export const FinancialFraudForm = ({ formData = initialFormData, setFormData }: {
  formData: FinancialFraudFormData;
  setFormData: (data: FinancialFraudFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fraudType) newErrors.fraudType = 'Fraud type is required';
    if (!formData.bankDetails.bankName) newErrors.bankName = 'Bank name is required';
    if (!formData.bankDetails.accountType) newErrors.accountType = 'Account type is required';
    if (!formData.dateDiscovered) newErrors.dateDiscovered = 'Date discovered is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.transactionDetails.amountLost) newErrors.amountLost = 'Amount lost is required';

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
      const response = await fetch('/api/financial-fraud', {
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
        {/* Fraud Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Financial Fraud
          </label>
          <select
            name="fraudType"
            value={formData.fraudType}
            onChange={(e) => setFormData({...formData, fraudType: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Fraud Type</option>
            <option value="unauthorized">Unauthorized Transactions</option>
            <option value="card">Card Fraud</option>
            <option value="check">Check Fraud</option>
            <option value="loan">Loan Fraud</option>
            <option value="account">Account Takeover</option>
            <option value="wire">Wire Transfer Fraud</option>
            <option value="phishing">Phishing Attack</option>
            <option value="other">Other</option>
          </select>
          {errors.fraudType && <p className="text-red-500 text-sm mt-1">{errors.fraudType}</p>}
        </div>
  
        {/* Bank Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Name
          </label>
          <select
            name="bankName"
            value={formData.bankDetails.bankName}
            onChange={(e) => setFormData({
              ...formData, 
              bankDetails: {...formData.bankDetails, bankName: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Bank</option>
            <option value="ecobank">Ecobank</option>
            <option value="gcb">GCB Bank</option>
            <option value="absa">Absa Bank</option>
            <option value="stanbic">Stanbic Bank</option>
            <option value="fidelity">Fidelity Bank</option>
            <option value="cal">CAL Bank</option>
            <option value="other">Other</option>
          </select>
          {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type
          </label>
          <select
            name="accountType"
            value={formData.bankDetails.accountType}
            onChange={(e) => setFormData({
              ...formData,
              bankDetails: {...formData.bankDetails, accountType: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Account Type</option>
            <option value="savings">Savings Account</option>
            <option value="current">Current Account</option>
            <option value="credit">Credit Card</option>
            <option value="loan">Loan Account</option>
            <option value="business">Business Account</option>
            <option value="other">Other</option>
          </select>
          {errors.accountType && <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>}
        </div>
  
        {/* Date and Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Discovered
          </label>
          <input
            type="date"
            name="dateDiscovered"
            value={formData.dateDiscovered}
            onChange={(e) => setFormData({...formData, dateDiscovered: e.target.value})}
            className="w-full p-2 border rounded-lg"
          />
          {errors.dateDiscovered && <p className="text-red-500 text-sm mt-1">{errors.dateDiscovered}</p>}
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount Lost
          </label>
          <input
            type="number"
            name="amountLost"
            value={formData.transactionDetails.amountLost}
            onChange={(e) => setFormData({
              ...formData,
              transactionDetails: {...formData.transactionDetails, amountLost: Number(e.target.value)}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter amount in GHS"
          />
          {errors.amountLost && <p className="text-red-500 text-sm mt-1">{errors.amountLost}</p>}
        </div>

        {/* Description */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Detailed Description
  </label>
  <textarea
    value={formData.description}
    onChange={(e) => setFormData({...formData, description: e.target.value})}
    className="w-full p-2 border rounded-lg h-32"
    placeholder="Please provide a detailed description of the fraud..."
  />
  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
</div>

{/* Fraudster Communication Method */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Communication Method Used
  </label>
  <select
    value={formData.fraudsterDetails.communicationMethod}
    onChange={(e) => setFormData({
      ...formData,
      fraudsterDetails: {...formData.fraudsterDetails, communicationMethod: e.target.value}
    })}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Communication Method</option>
    <option value="email">Email</option>
    <option value="phone">Phone Call</option>
    <option value="sms">SMS</option>
    <option value="whatsapp">WhatsApp</option>
    <option value="inperson">In Person</option>
    <option value="other">Other</option>
  </select>
</div>

{/* Transaction Details */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Transaction Details
  </label>
  <textarea
    value={formData.transactionDetails.details}
    onChange={(e) => setFormData({
      ...formData,
      transactionDetails: {...formData.transactionDetails, details: e.target.value}
    })}
    className="w-full p-2 border rounded-lg h-32"
    placeholder="Enter details about the fraudulent transaction(s)..."
  />
</div>

{/* Bank Response */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Bank Response Details
  </label>
  <textarea
    value={formData.recoveryStatus.bankResponse}
    onChange={(e) => setFormData({
      ...formData,
      recoveryStatus: {...formData.recoveryStatus, bankResponse: e.target.value}
    })}
    className="w-full p-2 border rounded-lg h-32"
    placeholder="Describe the bank's response to your fraud report..."
  />
</div>

{/* Affected Services */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Affected Services
  </label>
  <div className="space-y-2">
    {['Mobile Banking', 'Internet Banking', 'ATM', 'Credit Card', 'Debit Card', 'Other'].map((service) => (
      <div key={service} className="flex items-center">
        <input
          type="checkbox"
          checked={formData.affectedServices.includes(service)}
          onChange={(e) => {
            const updatedServices = e.target.checked
              ? [...formData.affectedServices, service]
              : formData.affectedServices.filter(s => s !== service);
            setFormData({...formData, affectedServices: updatedServices});
          }}
          className="h-4 w-4 text-blue-600 rounded"
        />
        <label className="ml-2">{service}</label>
      </div>
    ))}
  </div>
</div>

{/* Actions Taken */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Actions Taken
  </label>
  <textarea
    value={formData.actionsTaken}
    onChange={(e) => setFormData({...formData, actionsTaken: e.target.value})}
    className="w-full p-2 border rounded-lg h-32"
    placeholder="Describe the steps you've taken to address this fraud..."
  />
</div>

  
        {/* Fraudster Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suspected Perpetrator (if known)
          </label>
          <input
            type="text"
            name="suspectedPerpetrator"
            value={formData.fraudsterDetails.suspectedPerpetrator}
            onChange={(e) => setFormData({
              ...formData,
              fraudsterDetails: {...formData.fraudsterDetails, suspectedPerpetrator: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Name or identifier of suspected fraudster"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fraudster&apos;s Account Details
          </label>
          <input
            type="text"
            name="fraudsterAccount"
            value={formData.fraudsterDetails.fraudsterAccount}
            onChange={(e) => setFormData({
              ...formData,
              fraudsterDetails: {...formData.fraudsterDetails, fraudsterAccount: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Account number or details"
          />
        </div>
  
        
  
        {/* Fraud Indicators */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Compromise
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.fraudIndicators.accountCompromised}
              onChange={(e) => setFormData({
                ...formData,
                fraudIndicators: {...formData.fraudIndicators, accountCompromised: e.target.checked}
              })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Account Was Compromised</label>
          </div>
  
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.fraudIndicators.cardCompromised}
              onChange={(e) => setFormData({
                ...formData,
                fraudIndicators: {...formData.fraudIndicators, cardCompromised: e.target.checked}
              })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Card Was Compromised</label>
          </div>
  
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.fraudIndicators.checkFraud}
              onChange={(e) => setFormData({
                ...formData,
                fraudIndicators: {...formData.fraudIndicators, checkFraud: e.target.checked}
              })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Check Fraud</label>
          </div>
  
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.fraudIndicators.loanFraud}
              onChange={(e) => setFormData({
                ...formData,
                fraudIndicators: {...formData.fraudIndicators, loanFraud: e.target.checked}
              })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Loan Fraud</label>
          </div>
  
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.fraudIndicators.transferFraud}
              onChange={(e) => setFormData({
                ...formData,
                fraudIndicators: {...formData.fraudIndicators, transferFraud: e.target.checked}
              })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Transfer Fraud</label>
          </div>
        </div>
  
        {/* Recovery Status */}
        <div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={formData.recoveryStatus.recoveryAttempted}
              onChange={(e) => setFormData({
                ...formData,
                recoveryStatus: {...formData.recoveryStatus, recoveryAttempted: e.target.checked}
              })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Recovery Attempted</label>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recovery Amount (if any)
            </label>
            <input
              type="number"
              name="recoveryAmount"
              value={formData.recoveryStatus.recoveryAmount}
              onChange={(e) => setFormData({
                ...formData,
                recoveryStatus: {...formData.recoveryStatus, recoveryAmount: Number(e.target.value)}
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="Amount recovered in GHS"
            />
          </div>
  
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank&apos;s Response
            </label>
            <textarea
              name="bankResponse"
              value={formData.recoveryStatus.bankResponse}
              onChange={(e) => setFormData({
                ...formData,
                recoveryStatus: {...formData.recoveryStatus, bankResponse: e.target.value}
              })}
              rows={3}
              className="w-full p-2 border rounded-lg"
              placeholder="Describe the bank's response to your report..."
            />
          </div>
        </div>
  
        {/* Actions Status */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.actionsStatus.bankInformed}
              onChange={(e) => setFormData({
                ...formData,
                actionsStatus: {...formData.actionsStatus, bankInformed: e.target.checked}
              })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Bank Has Been Informed</label>
          </div>
  
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.actionsStatus.policeReported}
              onChange={(e) => setFormData({
                ...formData,
                actionsStatus: {...formData.actionsStatus, policeReported: e.target.checked}
              })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Police Report Filed</label>
          </div>
        </div>

        {/* Anonymous Report Option */}
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
            {formData.isAnonymous ? 'Submit Anonymous Report' : 'Submit Employment Scam Report'}
          </button>
        </div>
      </form>

      {showSuccessPopup && (
        <SuccessPopup
          reportId={reportId}
          onClose={() => setShowSuccessPopup(false)}
          onEvidenceUpload={() => router.push('/evidence-upload')}
        />
      )}
    </>
  );
};