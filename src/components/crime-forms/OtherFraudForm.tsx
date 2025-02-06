import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OtherFraudFormData {
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
  evidenceFiles: File[];
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
  isAnonymous: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
}

const initialFormData: OtherFraudFormData = {
  fraudCategory: '',
  dateOfIncident: '',
  description: '',
  methodDetails: {
    methodUsed: '',
    platformUsed: '',
    fraudTechniques: []
  },
  perpetratorDetails: {
    name: '',
    contactMethod: '',
    otherDetails: ''
  },
  evidenceFiles: [],
  impactDetails: {
    amountLost: 0,
    victimImpact: '',
    otherVictims: false
  },
  preventiveMeasures: {
    actionsTaken: '',
    preventiveSuggestions: '',
    additionalDetails: ''
  },
  actionsStatus: {
    policeReported: false
  },
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
        <h3 className="text-xl font-bold mb-4">Fraud Report Submitted Successfully!</h3>
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

export const OtherFraudForm = ({ formData = initialFormData, setFormData }: {
  formData: OtherFraudFormData;
  setFormData: (data: OtherFraudFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fraudCategory) newErrors.fraudCategory = 'Fraud category is required';
    if (!formData.dateOfIncident) newErrors.dateOfIncident = 'Date of incident is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.methodDetails.methodUsed) newErrors.methodUsed = 'Method used is required';

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
      const response = await fetch('/api/other-fraud-activities', {
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

 

  const handleTechniqueSelection = (technique: string) => {
    const updatedTechniques = formData.methodDetails.fraudTechniques.includes(technique)
      ? formData.methodDetails.fraudTechniques.filter(t => t !== technique)
      : [...formData.methodDetails.fraudTechniques, technique];
    
    setFormData({
      ...formData,
      methodDetails: {
        ...formData.methodDetails,
        fraudTechniques: updatedTechniques
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Fraud Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fraud Category
          </label>
          <select
            value={formData.fraudCategory}
            onChange={(e) => setFormData({...formData, fraudCategory: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="impersonation">Impersonation Fraud</option>
            <option value="advance_fee">Advance Fee Fraud</option>
            <option value="romance">Romance Scam</option>
            <option value="charity">Fake Charity</option>
            <option value="prize">Lottery/Prize Scam</option>
            <option value="business">Business Fraud</option>
            <option value="tech_support">Tech Support Scam</option>
            <option value="other">Other Novel Fraud</option>
          </select>
          {errors.fraudCategory && <p className="text-red-500 text-sm mt-1">{errors.fraudCategory}</p>}
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

{/* Impact Details */}
<div className="space-y-4">
  <label className="block text-sm font-medium text-gray-700">Impact Details</label>
  <input
    type="number"
    value={formData.impactDetails.amountLost}
    onChange={(e) => setFormData({
      ...formData,
      impactDetails: {...formData.impactDetails, amountLost: Number(e.target.value)}
    })}
    className="w-full p-2 border rounded-lg"
    placeholder="Amount Lost (GHS)"
  />
  <textarea
    value={formData.impactDetails.victimImpact}
    onChange={(e) => setFormData({
      ...formData,
      impactDetails: {...formData.impactDetails, victimImpact: e.target.value}
    })}
    className="w-full p-2 border rounded-lg"
    placeholder="Describe how this fraud has affected you..."
  />
  <div className="flex items-center">
    <input
      type="checkbox"
      checked={formData.impactDetails.otherVictims}
      onChange={(e) => setFormData({
        ...formData,
        impactDetails: {...formData.impactDetails, otherVictims: e.target.checked}
      })}
      className="h-4 w-4 text-blue-600 rounded"
    />
    <label className="ml-2">Are there other known victims?</label>
  </div>
</div>

{/* Preventive Measures */}
<div className="space-y-4">
  <label className="block text-sm font-medium text-gray-700">Preventive Measures</label>
  <textarea
    value={formData.preventiveMeasures.actionsTaken}
    onChange={(e) => setFormData({
      ...formData,
      preventiveMeasures: {...formData.preventiveMeasures, actionsTaken: e.target.value}
    })}
    className="w-full p-2 border rounded-lg"
    placeholder="Actions taken to address the situation..."
  />
  <textarea
    value={formData.preventiveMeasures.preventiveSuggestions}
    onChange={(e) => setFormData({
      ...formData,
      preventiveMeasures: {...formData.preventiveMeasures, preventiveSuggestions: e.target.value}
    })}
    className="w-full p-2 border rounded-lg"
    placeholder="Suggestions to prevent similar fraud..."
  />
  <textarea
    value={formData.preventiveMeasures.additionalDetails}
    onChange={(e) => setFormData({
      ...formData,
      preventiveMeasures: {...formData.preventiveMeasures, additionalDetails: e.target.value}
    })}
    className="w-full p-2 border rounded-lg"
    placeholder="Any additional details or information..."
  />
</div>


        {/* Method Details Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Method Details</label>
          <input
            type="text"
            value={formData.methodDetails.methodUsed}
            onChange={(e) => setFormData({
              ...formData,
              methodDetails: {...formData.methodDetails, methodUsed: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Method Used"
          />
          <select
            value={formData.methodDetails.platformUsed}
            onChange={(e) => setFormData({
              ...formData,
              methodDetails: {...formData.methodDetails, platformUsed: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Platform</option>
            <option value="social_media">Social Media</option>
            <option value="website">Website</option>
            <option value="phone">Phone Call</option>
            <option value="email">Email</option>
            <option value="messaging">Messaging App</option>
            <option value="in_person">In Person</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Fraud Techniques */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Techniques Used</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Social Engineering',
              'Fake Documents',
              'Impersonation',
              'Psychological Manipulation',
              'False Promises',
              'Urgency/Pressure',
              'Identity Theft',
              'Other Techniques'
            ].map((technique) => (
              <div key={technique} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.methodDetails.fraudTechniques.includes(technique)}
                  onChange={() => handleTechniqueSelection(technique)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label className="ml-2 text-sm">{technique}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Perpetrator Details */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Perpetrator Details</label>
          <input
            type="text"
            value={formData.perpetratorDetails.name}
            onChange={(e) => setFormData({
              ...formData,
              perpetratorDetails: {...formData.perpetratorDetails, name: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Perpetrator's Name (if known)"
          />
          <input
            type="text"
            value={formData.perpetratorDetails.contactMethod}
            onChange={(e) => setFormData({
              ...formData,
              perpetratorDetails: {...formData.perpetratorDetails, contactMethod: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Contact Method Used"
          />
        </div>

        {/* Impact Details */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Impact Details</label>
          <input
            type="number"
            value={formData.impactDetails.amountLost}
            onChange={(e) => setFormData({
              ...formData,
              impactDetails: {...formData.impactDetails, amountLost: Number(e.target.value)}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Amount Lost (GHS)"
          />
          <textarea
            value={formData.impactDetails.victimImpact}
            onChange={(e) => setFormData({
              ...formData,
              impactDetails: {...formData.impactDetails, victimImpact: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            rows={3}
            placeholder="Describe how this fraud has affected you..."
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.impactDetails.otherVictims}
              onChange={(e) => setFormData({
                ...formData,
                impactDetails: {...formData.impactDetails, otherVictims: e.target.checked}
              })}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2">Are there other known victims?</label>
          </div>
        </div>

        {/* Preventive Measures */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Preventive Measures</label>
          <textarea
            value={formData.preventiveMeasures.actionsTaken}
            onChange={(e) => setFormData({
              ...formData,
              preventiveMeasures: {...formData.preventiveMeasures, actionsTaken: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            rows={3}
            placeholder="Actions taken to address the situation..."
          />
          <textarea
            value={formData.preventiveMeasures.preventiveSuggestions}
            onChange={(e) => setFormData({
              ...formData,
              preventiveMeasures: {...formData.preventiveMeasures, preventiveSuggestions: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            rows={3}
            placeholder="Suggestions to prevent similar fraud..."
          />
        </div>

        {/* Police Report Status */}
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
          <label className="ml-2">Reported to Police</label>
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
            {formData.isAnonymous ? 'Submit Anonymous Report' : 'Submit Fraud Report'}
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
