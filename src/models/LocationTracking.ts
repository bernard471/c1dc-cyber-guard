import mongoose from 'mongoose';

const locationTrackingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: String,
  trackingMethod: { 
    type: String, 
    required: true 
  },
  dateDiscovered: { 
    type: Date, 
    required: true 
  },
  duration: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  suspectedPerpetrator: String,
  locationAffected: String,
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  devicesAffected: [{
    deviceType: String,
    deviceName: String,
    affectedDate: Date
  }],
  physicalStalking: Boolean,
  onlineStalking: Boolean,
  threatsReceived: Boolean,
  policeReported: Boolean,
  restrainingOrder: Boolean,
  financialLoss: Number,
  safetyMeasures: String,
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

export const LocationTracking = mongoose.models.LocationTracking || mongoose.model('LocationTracking', locationTrackingSchema);
