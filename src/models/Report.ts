import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    required: true,
    enum: ['momo', 'whatsapp', 'social', 'sextortion', 'email', 'stalking', 
           'identity', 'shopping', 'crypto', 'employment', 'finance', 'Other']
  },
  caseNumber: {
    type: String,
    unique: true,
    
  },
  status: {
    type: String,
    enum: ['pending', 'investigating', 'resolved', 'closed'],
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  reportData: {
    crimeDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    contactInfo: {
      isAnonymous: Boolean,
      name: String,
      email: String,
      phone: String,
      contactPreference: {
        type: String,
        enum: ['email', 'phone', 'whatsapp']
      }
    }
  },
  timeline: [{
    action: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  }
}, {
  timestamps: true
});


reportSchema.index({ reportType: 1, status: 1 });
reportSchema.index({ userId: 1, createdAt: -1 });

export const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);
