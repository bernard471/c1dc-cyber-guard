import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ShoppingScamFormData {
  platformUsed: string;
  dateOfIncident: string;
  description: string;
  scammerDetails: {
    name: string;
    phone: string;
    email: string;
    socialMedia: string;
    otherDetails: string;
  };
  productType: string;
  paymentMethod: string;
  evidenceFiles: File[];
  orderDetails: {
    orderNumber: string;
    amountLost: number;
    websiteURL: string;
    sellerContact: string;
    deliveryPromised: string;
  };
  scamIndicators: {
    fakeWebsite: boolean;
    fakeProduct: boolean;
    nonDelivery: boolean;
  };
  actionsStatus: {
    bankInformed: boolean;
    policeReported: boolean;
    productReceived: boolean;
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

const initialFormData: ShoppingScamFormData = {
  platformUsed: '',
  dateOfIncident: '',
  description: '',
  scammerDetails: {
    name: '',
    phone: '',
    email: '',
    socialMedia: '',
    otherDetails: ''
  },
  productType: '',
  paymentMethod: '',
  evidenceFiles: [],
  orderDetails: {
    orderNumber: '',
    amountLost: 0,
    websiteURL: '',
    sellerContact: '',
    deliveryPromised: ''
  },
  scamIndicators: {
    fakeWebsite: false,
    fakeProduct: false,
    nonDelivery: false
  },
  actionsStatus: {
    bankInformed: false,
    policeReported: false,
    productReceived: false
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
        <h3 className="text-xl font-bold mb-4">Shopping Scam Report Submitted Successfully!</h3>
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


export const ShoppingScamForm = ({ formData = initialFormData, setFormData }: {
  formData: ShoppingScamFormData;
  setFormData: (data: ShoppingScamFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.platformUsed) newErrors.platformUsed = 'Platform is required';
    if (!formData.dateOfIncident) newErrors.dateOfIncident = 'Date of incident is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.productType) newErrors.productType = 'Product type is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    if (!formData.orderDetails.amountLost) newErrors.amountLost = 'Amount lost is required';

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
      const response = await fetch('/api/shopping-scam', {
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
        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform/Website Used
          </label>
          <select
            value={formData.platformUsed}
            onChange={(e) => setFormData({...formData, platformUsed: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Platform</option>
            <option value="facebook">Facebook Marketplace</option>
            <option value="instagram">Instagram Shop</option>
            <option value="jiji">Jiji</option>
            <option value="tonaton">Tonaton</option>
            <option value="jumia">Jumia</option>
            <option value="website">Independent Website</option>
            <option value="other">Other</option>
          </select>
          {errors.platformUsed && <p className="text-red-500 text-sm mt-1">{errors.platformUsed}</p>}
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
    placeholder="Please describe what happened with the shopping scam..."
  />
  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
</div>

{/* Product Type */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Product Type
  </label>
  <select
    value={formData.productType}
    onChange={(e) => setFormData({...formData, productType: e.target.value})}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Product Type</option>
    <option value="electronics">Electronics</option>
    <option value="clothing">Clothing</option>
    <option value="accessories">Accessories</option>
    <option value="home">Home & Living</option>
    <option value="digital">Digital Goods</option>
    <option value="other">Other</option>
  </select>
  {errors.productType && <p className="text-red-500 text-sm mt-1">{errors.productType}</p>}
</div>

{/* Payment Method */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Payment Method Used
  </label>
  <select
    value={formData.paymentMethod}
    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Payment Method</option>
    <option value="momo">Mobile Money</option>
    <option value="bank">Bank Transfer</option>
    <option value="card">Credit/Debit Card</option>
    <option value="cash">Cash on Delivery</option>
    <option value="other">Other</option>
  </select>
  {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
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
            placeholder="Scammer's Name (if known)"
          />
          <input
            type="tel"
            value={formData.scammerDetails.phone}
            onChange={(e) => setFormData({
              ...formData,
              scammerDetails: {...formData.scammerDetails, phone: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Phone Number"
          />
          <input
            type="email"
            value={formData.scammerDetails.email}
            onChange={(e) => setFormData({
              ...formData,
              scammerDetails: {...formData.scammerDetails, email: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Email Address"
          />
          <input
            type="text"
            value={formData.scammerDetails.socialMedia}
            onChange={(e) => setFormData({
              ...formData,
              scammerDetails: {...formData.scammerDetails, socialMedia: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Social Media Handles"
          />
        </div>

        {/* Order Details Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Order Details</label>
          <input
            type="text"
            value={formData.orderDetails.orderNumber}
            onChange={(e) => setFormData({
              ...formData,
              orderDetails: {...formData.orderDetails, orderNumber: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Order/Transaction Number"
          />
          <input
            type="number"
            value={formData.orderDetails.amountLost}
            onChange={(e) => setFormData({
              ...formData,
              orderDetails: {...formData.orderDetails, amountLost: Number(e.target.value)}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Amount Lost (GHS)"
          />
          <input
            type="url"
            value={formData.orderDetails.websiteURL}
            onChange={(e) => setFormData({
              ...formData,
              orderDetails: {...formData.orderDetails, websiteURL: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Website URL"
          />
          <input
            type="date"
            value={formData.orderDetails.deliveryPromised}
            onChange={(e) => setFormData({
              ...formData,
              orderDetails: {...formData.orderDetails, deliveryPromised: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Scam Indicators */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Scam Indicators</label>
          {[
            { key: 'fakeWebsite', label: 'Fake Website/Store' },
            { key: 'fakeProduct', label: 'Counterfeit/Fake Product' },
            { key: 'nonDelivery', label: 'Non-Delivery of Product' }
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
            { key: 'policeReported', label: 'Reported to Police' },
            { key: 'productReceived', label: 'Product Received (Different from Advertised)' }
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
            {formData.isAnonymous ? 'Submit Anonymous Report' : 'Submit Shopping Scam Report'}
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
