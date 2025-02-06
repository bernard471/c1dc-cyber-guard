import mongoose from 'mongoose';

const emailHackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: String,
  emailAddress: { 
    type: String, 
    required: true 
  },
  emailProvider: { 
    type: String, 
    required: true 
  },
  emailPhone: {
    type: String,
    required: true
  },
  hackMethod: { 
    type: String, 
    required: true 
  },
  dateOfHack: { 
    type: Date, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  suspectedPerpetrator: String,
  accountStatus: String,
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  recoveryAttempted: Boolean,
  emailsCompromised: Boolean,
  contactsAffected: Boolean,
  passwordChanged: Boolean,
  financialLoss: Number,
  twoFactorEnabled: Boolean,
  linkedAccountsAffected: Boolean,
  recoveryEmailCompromised: Boolean,
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

export const EmailHack = mongoose.models.EmailHack || mongoose.model('EmailHack', emailHackSchema);
