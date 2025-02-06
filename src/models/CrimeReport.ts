import mongoose from 'mongoose';

const crimeReportSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true,
    enum: ['critical', 'high', 'medium', 'low']
  },
  description: {
    type: String,
    required: true
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  files: [{
    fileName: String,
    fileData: String,
    fileType: String,
    uploadDate: Date
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
}, { timestamps: true });

export default mongoose.models.CrimeReport || mongoose.model('CrimeReport', crimeReportSchema);
