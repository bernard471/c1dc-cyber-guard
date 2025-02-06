import mongoose from 'mongoose';

const otherFraudSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: String,
  fraudCategory: { 
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
  methodDetails: {
    methodUsed: { 
      type: String, 
      required: true 
    },
    platformUsed: String,
    fraudTechniques: [String]
  },
  perpetratorDetails: {
    name: String,
    contactMethod: String,
    otherDetails: String
  },
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  impactDetails: {
    amountLost: Number,
    victimImpact: String,
    otherVictims: Boolean
  },
  preventiveMeasures: {
    actionsTaken: String,
    preventiveSuggestions: String,
    additionalDetails: String
  },
  actionsStatus: {
    policeReported: Boolean
  },
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

export const OtherFraud = mongoose.models.OtherFraud || mongoose.model('OtherFraud', otherFraudSchema);
