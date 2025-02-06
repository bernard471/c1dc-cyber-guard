import mongoose from 'mongoose';

const identityTheftSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: String,
  typeOfTheft: { 
    type: String, 
    required: true 
  },
  dateDiscovered: { 
    type: Date, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  suspectedMethod: { 
    type: String, 
    required: true 
  },
  suspectedPerpetrator: String,
  documentsCompromised: [{
    documentType: String,
    dateCompromised: Date,
    details: String
  }],
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  accountsAffected: [{
    accountType: String,
    institution: String,
    dateAffected: Date
  }],
  creditCardsFraud: Boolean,
  bankAccountsFraud: Boolean,
  loansCreated: Boolean,
  governmentDocuments: Boolean,
  socialMediaImpersonation: Boolean,
  businessImpersonation: Boolean,
  financialLoss: Number,
  policeReported: Boolean,
  creditBureauNotified: Boolean,
  bankNotified: Boolean,
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

export const IdentityTheft = mongoose.models.IdentityTheft || mongoose.model('IdentityTheft', identityTheftSchema);
