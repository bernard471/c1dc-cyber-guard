import mongoose from 'mongoose';

const momoFraudSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: String,
  momoNumber: String,
  transactionId: String,
  provider: String,
  amount: Number,
  dateOfTransaction: Date,
  description: String,
  fraudsterNumber: String,
  fraudsterName: String,
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  isAnonymous: Boolean,
  contactInfo: {
    name: String,
    email: String,
    phone: String,
    contactPreference: String
  },
  status: {
    type: String,
    default: 'pending'
  },
  statusMessage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export const MomoFraud = mongoose.models.MomoFraud || mongoose.model('MomoFraud', momoFraudSchema);
