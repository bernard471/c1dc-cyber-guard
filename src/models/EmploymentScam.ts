import mongoose from 'mongoose';

const employmentScamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: String,
  scamType: { 
    type: String, 
    required: true 
  },
  dateOfIncident: { 
    type: Date, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  companyDetails: {
    companyName: { 
      type: String, 
      required: true 
    },
    jobTitle: { 
      type: String, 
      required: true 
    },
    websiteURL: String,
    jobPostingPlatform: String,
    promisedSalary: Number
  },
  scammerDetails: {
    name: String,
    email: String,
    phone: String,
    position: String,
    otherDetails: String
  },
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  documentsSubmitted: [{
    documentType: String,
    submissionDate: Date,
    details: String
  }],
  financialDetails: {
    amountLost: Number,
    recruitmentFees: Number,
    paymentMethod: String
  },
  scamIndicators: {
    interviewConducted: Boolean,
    paymentRequested: Boolean,
    documentsRequested: Boolean,
    personalInfoShared: Boolean,
    bankDetailsShared: Boolean,
    contractReceived: Boolean
  },
  communicationMethod: String,
  policeReported: Boolean,
  actionsTaken: String,
  status: {
    type: String,
    default: 'pending'
  },
  statusMessage: {
    type: String,
    default: ''
  },
  isAnonymous: Boolean,
  contactInfo: {
    name: String,
    email: String,
    phone: String,
    contactPreference: String
  }
}, {
  timestamps: true
});

export const EmploymentScam = mongoose.models.EmploymentScam || mongoose.model('EmploymentScam', employmentScamSchema);
