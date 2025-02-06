import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface EmploymentScamFormData {
  scamType: string;
  dateOfIncident: string;
  description: string;
  companyDetails: {
    companyName: string;
    jobTitle: string;
    websiteURL: string;
    jobPostingPlatform: string;
    promisedSalary: number;
  };
  scammerDetails: {
    name: string;
    email: string;
    phone: string;
    position: string;
    otherDetails: string;
  };
  evidenceFiles: File[];
  documentsSubmitted: {
    documentType: string;
    submissionDate: string;
    details: string;
  }[];
  financialDetails: {
    amountLost: number;
    recruitmentFees: number;
    paymentMethod: string;
  };
  scamIndicators: {
    interviewConducted: boolean;
    paymentRequested: boolean;
    documentsRequested: boolean;
    personalInfoShared: boolean;
    bankDetailsShared: boolean;
    contractReceived: boolean;
  };
  communicationMethod: string;
  policeReported: boolean;
  actionsTaken: string;
  isAnonymous: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
}

const initialFormData: EmploymentScamFormData = {
  scamType: '',
  dateOfIncident: '',
  description: '',
  companyDetails: {
    companyName: '',
    jobTitle: '',
    websiteURL: '',
    jobPostingPlatform: '',
    promisedSalary: 0
  },
  scammerDetails: {
    name: '',
    email: '',
    phone: '',
    position: '',
    otherDetails: ''
  },
  evidenceFiles: [],
  documentsSubmitted: [],
  financialDetails: {
    amountLost: 0,
    recruitmentFees: 0,
    paymentMethod: ''
  },
  scamIndicators: {
    interviewConducted: false,
    paymentRequested: false,
    documentsRequested: false,
    personalInfoShared: false,
    bankDetailsShared: false,
    contractReceived: false
  },
  communicationMethod: '',
  policeReported: false,
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
        <h3 className="text-xl font-bold mb-4">Employment Scam Report Submitted Successfully!</h3>
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

export const EmploymentScamForm = ({ formData = initialFormData, setFormData }: {
  formData: EmploymentScamFormData;
  setFormData: (data: EmploymentScamFormData) => void;
}) => {
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportId, setReportId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.scamType) newErrors.scamType = 'Scam type is required';
    if (!formData.dateOfIncident) newErrors.dateOfIncident = 'Date of incident is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.companyDetails.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.companyDetails.jobTitle) newErrors.jobTitle = 'Job title is required';

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
      const response = await fetch('/api/employment-scam', {
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
        {/* Scam Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Employment Scam
          </label>
          <select
            value={formData.scamType}
            onChange={(e) => setFormData({...formData, scamType: e.target.value})}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Scam Type</option>
            <option value="fake_job">Fake Job Offer</option>
            <option value="recruitment_fee">Recruitment Fee Scam</option>
            <option value="work_from_home">Work From Home Scam</option>
            <option value="training_fee">Training Fee Scam</option>
            <option value="visa_processing">Visa Processing Scam</option>
            <option value="identity_theft">Identity Theft Through Job Application</option>
            <option value="other">Other</option>
          </select>
          {errors.scamType && <p className="text-red-500 text-sm mt-1">{errors.scamType}</p>}
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
    placeholder="Please describe what happened with the employment scam..."
  />
  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
</div>

{/* Communication Method */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Primary Communication Method
  </label>
  <select
    value={formData.communicationMethod}
    onChange={(e) => setFormData({...formData, communicationMethod: e.target.value})}
    className="w-full p-2 border rounded-lg"
  >
    <option value="">Select Communication Method</option>
    <option value="email">Email</option>
    <option value="phone">Phone Call</option>
    <option value="whatsapp">WhatsApp</option>
    <option value="telegram">Telegram</option>
    <option value="inperson">In Person</option>
    <option value="other">Other</option>
  </select>
</div>

{/* Documents Submitted Section */}
<div className="space-y-4">
  <label className="block text-sm font-medium text-gray-700">Documents Submitted</label>
  {formData.documentsSubmitted.map((doc, index) => (
    <div key={index} className="flex gap-2">
      <select
        value={doc.documentType}
        onChange={(e) => {
          const newDocs = [...formData.documentsSubmitted];
          newDocs[index].documentType = e.target.value;
          setFormData({...formData, documentsSubmitted: newDocs});
        }}
        className="flex-1 p-2 border rounded-lg"
      >
        <option value="">Select Document Type</option>
        <option value="id">ID Card</option>
        <option value="passport">Passport</option>
        <option value="cv">CV/Resume</option>
        <option value="certificate">Certificates</option>
        <option value="bank">Bank Details</option>
        <option value="other">Other</option>
      </select>
      <input
        type="date"
        value={doc.submissionDate}
        onChange={(e) => {
          const newDocs = [...formData.documentsSubmitted];
          newDocs[index].submissionDate = e.target.value;
          setFormData({...formData, documentsSubmitted: newDocs});
        }}
        className="flex-1 p-2 border rounded-lg"
      />
      <input
        type="text"
        value={doc.details}
        onChange={(e) => {
          const newDocs = [...formData.documentsSubmitted];
          newDocs[index].details = e.target.value;
          setFormData({...formData, documentsSubmitted: newDocs});
        }}
        placeholder="Additional Details"
        className="flex-1 p-2 border rounded-lg"
      />
      <button
        type="button"
        onClick={() => {
          const newDocs = formData.documentsSubmitted.filter((_, i) => i !== index);
          setFormData({...formData, documentsSubmitted: newDocs});
        }}
        className="text-red-500 hover:text-red-700"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => setFormData({
      ...formData,
      documentsSubmitted: [...formData.documentsSubmitted, { documentType: '', submissionDate: '', details: '' }]
    })}
    className="text-blue-500 hover:text-blue-700"
  >
    + Add Document
  </button>
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


        {/* Company Details Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Company Details</label>
          <input
            type="text"
            value={formData.companyDetails.companyName}
            onChange={(e) => setFormData({
              ...formData,
              companyDetails: {...formData.companyDetails, companyName: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Company Name"
          />
          <input
            type="text"
            value={formData.companyDetails.jobTitle}
            onChange={(e) => setFormData({
              ...formData,
              companyDetails: {...formData.companyDetails, jobTitle: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Job Title"
          />
          <input
            type="url"
            value={formData.companyDetails.websiteURL}
            onChange={(e) => setFormData({
              ...formData,
              companyDetails: {...formData.companyDetails, websiteURL: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Company Website URL"
          />
          <select
            value={formData.companyDetails.jobPostingPlatform}
            onChange={(e) => setFormData({
              ...formData,
              companyDetails: {...formData.companyDetails, jobPostingPlatform: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Job Platform</option>
            <option value="linkedin">LinkedIn</option>
            <option value="jobhouse">JobHouse Ghana</option>
            <option value="jobberman">Jobberman</option>
            <option value="facebook">Facebook</option>
            <option value="newspaper">Newspaper</option>
            <option value="direct_email">Direct Email</option>
            <option value="other">Other</option>
          </select>
          <input
            type="number"
            value={formData.companyDetails.promisedSalary}
            onChange={(e) => setFormData({
              ...formData,
              companyDetails: {...formData.companyDetails, promisedSalary: Number(e.target.value)}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Promised Salary (GHS)"
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
            placeholder="Scammer's Name"
          />
          <input
            type="email"
            value={formData.scammerDetails.email}
            onChange={(e) => setFormData({
              ...formData,
              scammerDetails: {...formData.scammerDetails, email: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Scammer's Email"
          />
          <input
            type="tel"
            value={formData.scammerDetails.phone}
            onChange={(e) => setFormData({
              ...formData,
              scammerDetails: {...formData.scammerDetails, phone: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Scammer's Phone"
          />
          <input
            type="text"
            value={formData.scammerDetails.position}
            onChange={(e) => setFormData({
              ...formData,
              scammerDetails: {...formData.scammerDetails, position: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Scammer's Position"
          />
        </div>

        {/* Financial Details Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Financial Details</label>
          <input
            type="number"
            value={formData.financialDetails.amountLost}
            onChange={(e) => setFormData({
              ...formData,
              financialDetails: {...formData.financialDetails, amountLost: Number(e.target.value)}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Amount Lost (GHS)"
          />
          <input
            type="number"
            value={formData.financialDetails.recruitmentFees}
            onChange={(e) => setFormData({
              ...formData,
              financialDetails: {...formData.financialDetails, recruitmentFees: Number(e.target.value)}
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Recruitment Fees Paid (GHS)"
          />
          <select
            value={formData.financialDetails.paymentMethod}
            onChange={(e) => setFormData({
              ...formData,
              financialDetails: {...formData.financialDetails, paymentMethod: e.target.value}
            })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Payment Method</option>
            <option value="momo">Mobile Money</option>
            <option value="bank">Bank Transfer</option>
            <option value="cash">Cash</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Scam Indicators */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Scam Indicators</label>
          {[
            { key: 'interviewConducted', label: 'Interview Was Conducted' },
            { key: 'paymentRequested', label: 'Payment Was Requested' },
            { key: 'documentsRequested', label: 'Sensitive Documents Were Requested' },
            { key: 'personalInfoShared', label: 'Personal Information Was Shared' },
            { key: 'bankDetailsShared', label: 'Bank Details Were Shared' },
            { key: 'contractReceived', label: 'Employment Contract Was Received' }
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
