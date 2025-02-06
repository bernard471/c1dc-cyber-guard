import mongoose from 'mongoose';

const socialMediaHackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: String,
  platform: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  accountEmail:{
    type: String,
    required: true
  },
  accountPhone: {
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
  postsCompromised: Boolean,
  messagesAccessed: Boolean,
  followersLost: Number,
  financialLoss: Number,
  twoFactorEnabled: Boolean,
  emailCompromised: Boolean,
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

export const SocialMediaHack = mongoose.models.SocialMediaHack || mongoose.model('SocialMediaHack', socialMediaHackSchema);
