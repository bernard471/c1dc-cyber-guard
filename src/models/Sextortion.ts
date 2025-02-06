import mongoose from 'mongoose';

const sextortionSchema = new mongoose.Schema({
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
  threatType: { 
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
  perpetratorInfo: {
    platform: String,
    username: String,
    phone: String,
    email: String,
    otherDetails: String
  },
  demandAmount: Number,
  paymentMethod: String,
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  socialMediaHandles: [{
    platform: String,
    username: String
  }],
  threatsReceived: {
    type: String,
    required: true
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

export const Sextortion = mongoose.models.Sextortion || mongoose.model('Sextortion', sextortionSchema);
