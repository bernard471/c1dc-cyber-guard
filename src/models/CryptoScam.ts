import mongoose from 'mongoose';

const cryptoScamSchema = new mongoose.Schema({
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
  platformUsed: { 
    type: String, 
    required: true 
  },
  cryptoType: { 
    type: String, 
    required: true 
  },
  scammerDetails: {
    name: String,
    platform: String,
    contactInfo: String,
    walletAddress: String,
    otherDetails: String
  },
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  transactionDetails: {
    amountLost: Number,
    investmentPromised: Number,
    websiteURL: String,
    communicationMethod: String
  },
  scamIndicators: {
    fakeWebsite: Boolean,
    fakeInvestment: Boolean,
    ponziScheme: Boolean,
    miningScam: Boolean,
    walletCompromised: Boolean,
    exchangeCompromised: Boolean
  },
  actionsStatus: {
    bankInformed: Boolean,
    policeReported: Boolean
  },
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

export const CryptoScam = mongoose.models.CryptoScam || mongoose.model('CryptoScam', cryptoScamSchema);
