import mongoose from 'mongoose';

const evidenceSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true
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
  description: String,
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Evidence = mongoose.models.Evidence || mongoose.model('Evidence', evidenceSchema);

export default Evidence;
