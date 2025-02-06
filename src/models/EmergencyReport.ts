import mongoose, { Schema } from 'mongoose';

const EmergencyReportSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    required: true,
    enum: ['critical', 'high', 'medium', 'low'],
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
  files: [{
    fileName: String,
    fileData: String,
    fileType: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'in-progress', 'resolved'],
  },
  statusMessage: {
    type: String,
    default: ''
  }
}, { 
  timestamps: true,
  strict: true 
});

const EmergencyReport = mongoose.models.EmergencyReport || mongoose.model('EmergencyReport', EmergencyReportSchema);

export default EmergencyReport;
