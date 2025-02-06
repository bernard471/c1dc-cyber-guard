import mongoose from 'mongoose';

const whatsAppHackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: String,
  phoneNumber: { 
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
  accountAccess: String,
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  recoveryAttempted: Boolean,
  messagesCompromised: Boolean,
  contactsAffected: Boolean,
  financialLoss: Number,
  twoFactorEnabled: Boolean,
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

export const WhatsAppHack = mongoose.models.WhatsAppHack || mongoose.model('WhatsAppHack', whatsAppHackSchema);
