import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: {
    type: String,
    required: function(this: { isGoogleUser: boolean }) {
      return !this.isGoogleUser; // Password only required for non-Google users
    }  },
  isGoogleUser: {
    type: Boolean,
    default: false
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
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
