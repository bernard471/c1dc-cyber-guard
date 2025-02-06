import mongoose from 'mongoose';

const financialFraudSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: String,
  fraudType: { 
    type: String, 
    required: true 
  },
  bankDetails: {
    bankName: { 
      type: String, 
      required: true 
    },
    accountType: { 
      type: String, 
      required: true 
    }
  },
  dateDiscovered: { 
    type: Date, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  fraudsterDetails: {
    suspectedPerpetrator: String,
    fraudsterAccount: String,
    communicationMethod: String,
    otherDetails: String
  },
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  transactionDetails: {
    amountLost: Number,
    transactionDate: Date,
    transactionType: String,
    details: String
  },
  fraudIndicators: {
    accountCompromised: Boolean,
    cardCompromised: Boolean,
    checkFraud: Boolean,
    loanFraud: Boolean,
    transferFraud: Boolean
  },
  recoveryStatus: {
    recoveryAttempted: Boolean,
    recoveryAmount: Number,
    bankResponse: String
  },
  actionsStatus: {
    bankInformed: Boolean,
    policeReported: Boolean
  },
  actionsTaken: String,
  affectedServices: [{
    serviceName: String,
    dateAffected: Date,
    status: String
  }],
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

export const FinancialFraud = mongoose.models.FinancialFraud || mongoose.model('FinancialFraud', financialFraudSchema);
