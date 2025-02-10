import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SextortionFormData {
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
  evidenceFiles: File[] ;
  socialMediaHandles: {
    platform: string;
    username: string;
  }[];
  threatsReceived: string;
  isAnonymous: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
}

const initialFormData: SextortionFormData = {
  platform: '',
  threatType: '',
  dateOfIncident: '',
  description: '',
  perpetratorInfo: {
    platform: '',
    username: '',
    phone: '',
    email: '',
    otherDetails: ''
  },
  demandAmount: 0,
  paymentMethod: '',
  evidenceFiles: [] as File[],
  socialMediaHandles: [],
  threatsReceived: '',
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
        <h3 className="text-xl font-bold mb-4">Sextortion Report Submitted Successfully!</h3>
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

export const SextortionForm = ({ formData = initialFormData, setFormData }: {
  formData: SextortionFormData;
  setFormData: (data: SextortionFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.platform) newErrors.platform = 'Platform is required';
    if (!formData.threatType) newErrors.threatType = 'Threat type is required';
    if (!formData.dateOfIncident) newErrors.dateOfIncident = 'Date of incident is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.threatsReceived) newErrors.threatsReceived = 'Threats received is required';

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
      const response = await fetch('/api/sextortion', {
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
            Platform Where Incident Occurred
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={(e) => setFormData({...formData, platform: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Platform</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="snapchat">Snapchat</option>
            <option value="telegram">Telegram</option>
            <option value="other">Other</option>
          </select>
          {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Perpetrator Information
          </label>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Platform Username"
              value={formData.perpetratorInfo.username}
              onChange={(e) => setFormData({
                ...formData,
                perpetratorInfo: {...formData.perpetratorInfo, username: e.target.value}
              })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.perpetratorInfo.phone}
              onChange={(e) => setFormData({
                ...formData,
                perpetratorInfo: {...formData.perpetratorInfo, phone: e.target.value}
              })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.perpetratorInfo.email}
              onChange={(e) => setFormData({
                ...formData,
                perpetratorInfo: {...formData.perpetratorInfo, email: e.target.value}
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Rest of the existing form fields */}

        {/* Threat Type */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Type of Threat
  </label>
  <select
    name="threatType"
    value={formData.threatType}
    onChange={(e) => setFormData({...formData, threatType: e.target.value})}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Threat Type</option>
    <option value="image">Image Based</option>
    <option value="video">Video Based</option>
    <option value="both">Both Image and Video</option>
    <option value="other">Other</option>
  </select>
  {errors.threatType && <p className="text-red-500 text-sm mt-1">{errors.threatType}</p>}
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
    placeholder="Please describe what happened..."
  />
  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
</div>

{/* Demand Amount */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Demanded Amount
  </label>
  <input
    type="number"
    value={formData.demandAmount}
    onChange={(e) => setFormData({...formData, demandAmount: Number(e.target.value)})}
    className="w-full p-2 border rounded-lg"
    min="0"
  />
</div>

{/* Payment Method */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Payment Method Requested
  </label>
  <select
    value={formData.paymentMethod}
    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Payment Method</option>
    <option value="crypto">Cryptocurrency</option>
    <option value="bank">Bank Transfer</option>
    <option value="mobile">Mobile Money</option>
    <option value="other">Other</option>
  </select>
</div>

{/* Social Media Handles */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Your Social Media Handles
  </label>
  <div className="space-y-2">
    {formData.socialMediaHandles.map((handle, index) => (
      <div key={index} className="flex gap-2">
        <input
          type="text"
          placeholder="Platform"
          value={handle.platform}
          onChange={(e) => {
            const newHandles = [...formData.socialMediaHandles];
            newHandles[index].platform = e.target.value;
            setFormData({...formData, socialMediaHandles: newHandles});
          }}
          className="w-1/2 p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Username"
          value={handle.username}
          onChange={(e) => {
            const newHandles = [...formData.socialMediaHandles];
            newHandles[index].username = e.target.value;
            setFormData({...formData, socialMediaHandles: newHandles});
          }}
          className="w-1/2 p-2 border rounded-lg"
        />
      </div>
    ))}
    <button
      type="button"
      onClick={() => setFormData({
        ...formData,
        socialMediaHandles: [...formData.socialMediaHandles, { platform: '', username: '' }]
      })}
      className="text-blue-500 hover:text-blue-700"
    >
      + Add Social Media Handle
    </button>
  </div>
</div>

{/* Threats Received */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Threats Received
  </label>
  <textarea
    value={formData.threatsReceived}
    onChange={(e) => setFormData({...formData, threatsReceived: e.target.value})}
    className="w-full p-2 border rounded-lg h-32"
    placeholder="Please describe the threats you received..."
  />
  {errors.threatsReceived && <p className="text-red-500 text-sm mt-1">{errors.threatsReceived}</p>}
</div>

        {/* Adding Anonymous and Contact Info sections */}
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
            {formData.isAnonymous ? 'Submit Anonymous Report' : 'Submit Sextortion Report'}
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