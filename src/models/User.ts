import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: { 
    type: String,
    required: true
  },
  reports: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Report' 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastActive: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
