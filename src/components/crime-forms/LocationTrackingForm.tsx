import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface LocationTrackingFormData {
  trackingMethod: string;
  dateDiscovered: string;
  duration: string;
  description: string;
  suspectedPerpetrator: string;
  locationAffected: string;
  evidenceFiles: File[];
  devicesAffected: {
    deviceType: string;
    deviceName: string;
    affectedDate: string;
  }[];
  physicalStalking: boolean;
  onlineStalking: boolean;
  threatsReceived: boolean;
  policeReported: boolean;
  restrainingOrder: boolean;
  financialLoss: number;
  safetyMeasures: string;
  isAnonymous: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
}

const initialFormData: LocationTrackingFormData = {
  trackingMethod: '',
  dateDiscovered: '',
  duration: '',
  description: '',
  suspectedPerpetrator: '',
  locationAffected: '',
  evidenceFiles: [],
  devicesAffected: [],
  physicalStalking: false,
  onlineStalking: false,
  threatsReceived: false,
  policeReported: false,
  restrainingOrder: false,
  financialLoss: 0,
  safetyMeasures: '',
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
        <h3 className="text-xl font-bold mb-4">Location Tracking Report Submitted Successfully!</h3>
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

export const LocationTrackingForm = ({ formData = initialFormData, setFormData }: {
  formData: LocationTrackingFormData;
  setFormData: (data: LocationTrackingFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.trackingMethod) newErrors.trackingMethod = 'Tracking method is required';
    if (!formData.dateDiscovered) newErrors.dateDiscovered = 'Date discovered is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.locationAffected) newErrors.locationAffected = 'Location affected is required';

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
      const response = await fetch('/api/location-tracking', {
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

  const handleDeviceAdd = () => {
    setFormData({
      ...formData,
      devicesAffected: [...formData.devicesAffected, { deviceType: '', deviceName: '', affectedDate: '' }]
    });
  };

  const handleDeviceRemove = (index: number) => {
    setFormData({
      ...formData,
      devicesAffected: formData.devicesAffected.filter((_, i) => i !== index)
    });
  };

  const handleDeviceChange = (index: number, field: string, value: string) => {
    const updatedDevices = formData.devicesAffected.map((device, i) => {
      if (i === index) {
        return { ...device, [field]: value };
      }
      return device;
    });
    setFormData({ ...formData, devicesAffected: updatedDevices });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tracking Method
          </label>
          <select
            value={formData.trackingMethod}
            onChange={(e) => setFormData({...formData, trackingMethod: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Method</option>
            <option value="gps">GPS Tracker</option>
            <option value="phone">Phone Tracking</option>
            <option value="socialMedia">Social Media Stalking</option>
            <option value="spyware">Spyware/Tracking Apps</option>
            <option value="airtag">AirTag/Tracking Device</option>
            <option value="physical">Physical Following</option>
            <option value="other">Other</option>
          </select>
          {errors.trackingMethod && <p className="text-red-500 text-sm mt-1">{errors.trackingMethod}</p>}
        </div>

        {/* Date Discovered */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Date Tracking Was Discovered
  </label>
  <input
    type="date"
    value={formData.dateDiscovered}
    onChange={(e) => setFormData({...formData, dateDiscovered: e.target.value})}
    className="w-full p-2 border rounded-lg"
  />
  {errors.dateDiscovered && <p className="text-red-500 text-sm mt-1">{errors.dateDiscovered}</p>}
</div>

{/* Duration */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    How Long Were You Tracked?
  </label>
  <input
    type="text"
    value={formData.duration}
    onChange={(e) => setFormData({...formData, duration: e.target.value})}
    className="w-full p-2 border rounded-lg"
    placeholder="e.g., 2 weeks, 3 months"
  />
  {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
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
    placeholder="Please describe the tracking incident and how you discovered it..."
  />
  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
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

{/* Location Affected */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Locations Where Tracking Occurred
  </label>
  <input
    type="text"
    value={formData.locationAffected}
    onChange={(e) => setFormData({...formData, locationAffected: e.target.value})}
    className="w-full p-2 border rounded-lg"
    placeholder="e.g., Home, Work, School, Multiple locations"
  />
  {errors.locationAffected && <p className="text-red-500 text-sm mt-1">{errors.locationAffected}</p>}
</div>

{/* Financial Loss */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Financial Loss Amount
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

{/* Safety Measures */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Safety Measures Taken
  </label>
  <textarea
    value={formData.safetyMeasures}
    onChange={(e) => setFormData({...formData, safetyMeasures: e.target.value})}
    className="w-full p-2 border rounded-lg h-32"
    placeholder="Describe any safety measures you've taken since discovering the tracking..."
  />
</div>


        {/* Devices Affected Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Affected Devices</label>
          {formData.devicesAffected.map((device, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={device.deviceType}
                onChange={(e) => handleDeviceChange(index, 'deviceType', e.target.value)}
                placeholder="Device Type"
                className="flex-1 p-2 border rounded-lg"
              />
              <input
                type="text"
                value={device.deviceName}
                onChange={(e) => handleDeviceChange(index, 'deviceName', e.target.value)}
                placeholder="Device Name"
                className="flex-1 p-2 border rounded-lg"
              />
              <input
                type="date"
                value={device.affectedDate}
                onChange={(e) => handleDeviceChange(index, 'affectedDate', e.target.value)}
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleDeviceRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleDeviceAdd}
            className="text-blue-500 hover:text-blue-700"
          >
            + Add Device
          </button>
        </div>

        {/* Checkboxes for different types of stalking/tracking */}
        <div className="space-y-4">
          {[
            { key: 'physicalStalking', label: 'Physical Stalking Involved' },
            { key: 'onlineStalking', label: 'Online Stalking/Harassment' },
            { key: 'threatsReceived', label: 'Threats Were Received' },
            { key: 'policeReported', label: 'Reported to Police' },
            { key: 'restrainingOrder', label: 'Restraining Order Filed' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={formData[key as keyof LocationTrackingFormData] as boolean}
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
            {formData.isAnonymous ? 'Submit Anonymous Report' : 'Submit Location Tracking Report'}
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
