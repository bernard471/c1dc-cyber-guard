import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IdentityTheftFormData {
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
  evidenceFiles: File[];
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
  financialLoss: number;
  policeReported: boolean;
  creditBureauNotified: boolean;
  bankNotified: boolean;
  actionsTaken: string;
  isAnonymous: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
}

const initialFormData: IdentityTheftFormData = {
  typeOfTheft: '',
  dateDiscovered: '',
  description: '',
  suspectedMethod: '',
  suspectedPerpetrator: '',
  documentsCompromised: [],
  evidenceFiles: [],
  accountsAffected: [],
  creditCardsFraud: false,
  bankAccountsFraud: false,
  loansCreated: false,
  governmentDocuments: false,
  socialMediaImpersonation: false,
  businessImpersonation: false,
  financialLoss: 0,
  policeReported: false,
  creditBureauNotified: false,
  bankNotified: false,
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
        <h3 className="text-xl font-bold mb-4">Identity Theft Report Submitted Successfully!</h3>
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


export const IdentityTheftForm = ({ formData = initialFormData, setFormData }: {
  formData: IdentityTheftFormData;
  setFormData: (data: IdentityTheftFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.typeOfTheft) newErrors.typeOfTheft = 'Type of theft is required';
    if (!formData.dateDiscovered) newErrors.dateDiscovered = 'Date discovered is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.suspectedMethod) newErrors.suspectedMethod = 'Suspected method is required';

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
      const response = await fetch('/api/identity-theft', {
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


  const handleDocumentAdd = () => {
    setFormData({
      ...formData,
      documentsCompromised: [...formData.documentsCompromised, { 
        documentType: '', 
        dateCompromised: '', 
        details: '' 
      }]
    });
  };

  const handleAccountAdd = () => {
    setFormData({
      ...formData,
      accountsAffected: [...formData.accountsAffected, {
        accountType: '',
        institution: '',
        dateAffected: ''
      }]
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Identity Theft
          </label>
          <select
            value={formData.typeOfTheft}
            onChange={(e) => setFormData({...formData, typeOfTheft: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Type</option>
            <option value="financial">Financial Identity Theft</option>
            <option value="medical">Medical Identity Theft</option>
            <option value="criminal">Criminal Identity Theft</option>
            <option value="synthetic">Synthetic Identity Theft</option>
            <option value="child">Child Identity Theft</option>
            <option value="tax">Tax Identity Theft</option>
            <option value="business">Business Identity Theft</option>
            <option value="other">Other</option>
          </select>
          {errors.typeOfTheft && <p className="text-red-500 text-sm mt-1">{errors.typeOfTheft}</p>}
        </div>

        {/* Date Discovered */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Date Identity Theft Was Discovered
  </label>
  <input
    type="date"
    value={formData.dateDiscovered}
    onChange={(e) => setFormData({...formData, dateDiscovered: e.target.value})}
    className="w-full p-2 border rounded-lg"
  />
  {errors.dateDiscovered && <p className="text-red-500 text-sm mt-1">{errors.dateDiscovered}</p>}
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
    placeholder="Please describe how your identity was stolen and what happened..."
  />
  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
</div>

{/* Suspected Method */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Suspected Method of Identity Theft
  </label>
  <select
    value={formData.suspectedMethod}
    onChange={(e) => setFormData({...formData, suspectedMethod: e.target.value})}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Method</option>
    <option value="dataBreak">Data Breach</option>
    <option value="phishing">Phishing</option>
    <option value="documentTheft">Document Theft</option>
    <option value="skimming">Card Skimming</option>
    <option value="malware">Malware/Spyware</option>
    <option value="insider">Insider Theft</option>
    <option value="unknown">Unknown</option>
    <option value="other">Other</option>
  </select>
  {errors.suspectedMethod && <p className="text-red-500 text-sm mt-1">{errors.suspectedMethod}</p>}
</div>

{/* Suspected Perpetrator */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Suspected Perpetrator
  </label>
  <input
    type="text"
    value={formData.suspectedPerpetrator}
    onChange={(e) => setFormData({...formData, suspectedPerpetrator: e.target.value})}
    className="w-full p-2 border rounded-lg"
    placeholder="Enter any information about suspected perpetrator"
  />
</div>

{/* Financial Loss */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Total Financial Loss
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

{/* Actions Taken */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Actions Taken So Far
  </label>
  <textarea
    value={formData.actionsTaken}
    onChange={(e) => setFormData({...formData, actionsTaken: e.target.value})}
    className="w-full p-2 border rounded-lg h-32"
    placeholder="Describe what steps you've taken to address this identity theft..."
  />
</div>


        {/* Documents Compromised Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Compromised Documents</label>
          {formData.documentsCompromised.map((doc, index) => (
            <div key={index} className="flex gap-2">
              <select
                value={doc.documentType}
                onChange={(e) => {
                  const updatedDocs = [...formData.documentsCompromised];
                  updatedDocs[index].documentType = e.target.value;
                  setFormData({...formData, documentsCompromised: updatedDocs});
                }}
                className="flex-1 p-2 border rounded-lg"
              >
                <option value="">Select Document Type</option>
                <option value="ghanaCard">Ghana Card</option>
                <option value="passport">Passport</option>
                <option value="driversLicense">Driver&apos;s License</option>
                <option value="voterID">Voter ID</option>
                <option value="birthCertificate">Birth Certificate</option>
                <option value="other">Other</option>
              </select>
              <input
                type="date"
                value={doc.dateCompromised}
                onChange={(e) => {
                  const updatedDocs = [...formData.documentsCompromised];
                  updatedDocs[index].dateCompromised = e.target.value;
                  setFormData({...formData, documentsCompromised: updatedDocs});
                }}
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  const updatedDocs = formData.documentsCompromised.filter((_, i) => i !== index);
                  setFormData({...formData, documentsCompromised: updatedDocs});
                }}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleDocumentAdd}
            className="text-blue-500 hover:text-blue-700"
          >
            + Add Document
          </button>
        </div>

        {/* Accounts Affected Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Affected Accounts</label>
          {formData.accountsAffected.map((account, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={account.accountType}
                onChange={(e) => {
                  const updatedAccounts = [...formData.accountsAffected];
                  updatedAccounts[index].accountType = e.target.value;
                  setFormData({...formData, accountsAffected: updatedAccounts});
                }}
                placeholder="Account Type"
                className="flex-1 p-2 border rounded-lg"
              />
              <input
                type="text"
                value={account.institution}
                onChange={(e) => {
                  const updatedAccounts = [...formData.accountsAffected];
                  updatedAccounts[index].institution = e.target.value;
                  setFormData({...formData, accountsAffected: updatedAccounts});
                }}
                placeholder="Institution"
                className="flex-1 p-2 border rounded-lg"
              />
              <input
                type="date"
                value={account.dateAffected}
                onChange={(e) => {
                  const updatedAccounts = [...formData.accountsAffected];
                  updatedAccounts[index].dateAffected = e.target.value;
                  setFormData({...formData, accountsAffected: updatedAccounts});
                }}
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  const updatedAccounts = formData.accountsAffected.filter((_, i) => i !== index);
                  setFormData({...formData, accountsAffected: updatedAccounts});
                }}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAccountAdd}
            className="text-blue-500 hover:text-blue-700"
          >
            + Add Account
          </button>
        </div>

        {/* Checkboxes for different types of fraud */}
        <div className="space-y-4">
          {[
            { key: 'creditCardsFraud', label: 'Credit Cards Fraud' },
            { key: 'bankAccountsFraud', label: 'Bank Accounts Fraud' },
            { key: 'loansCreated', label: 'Fraudulent Loans Created' },
            { key: 'governmentDocuments', label: 'Government Documents Misused' },
            { key: 'socialMediaImpersonation', label: 'Social Media Impersonation' },
            { key: 'businessImpersonation', label: 'Business Identity Compromised' },
            { key: 'policeReported', label: 'Reported to Police' },
            { key: 'creditBureauNotified', label: 'Credit Bureau Notified' },
            { key: 'bankNotified', label: 'Bank(s) Notified' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={formData[key as keyof IdentityTheftFormData] as boolean}
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
            {formData.isAnonymous ? 'Submit Anonymous Report' : 'Submit Identity Theft Report'}
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
