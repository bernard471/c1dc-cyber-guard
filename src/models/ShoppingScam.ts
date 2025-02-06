import mongoose from 'mongoose';

const shoppingScamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportId: String,
  platformUsed: { 
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
  scammerDetails: {
    name: String,
    phone: String,
    email: String,
    socialMedia: String,
    otherDetails: String
  },
  productType: { 
    type: String, 
    required: true 
  },
  paymentMethod: { 
    type: String, 
    required: true 
  },
  evidenceFiles: [{
    fileName: String,
    uploadDate: Date
  }],
  orderDetails: {
    orderNumber: String,
    amountLost: Number,
    websiteURL: String,
    sellerContact: String,
    deliveryPromised: Date
  },
  scamIndicators: {
    fakeWebsite: Boolean,
    fakeProduct: Boolean,
    nonDelivery: Boolean
  },
  actionsStatus: {
    bankInformed: Boolean,
    policeReported: Boolean,
    productReceived: Boolean
  },
  actionsTaken: String,
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

export const ShoppingScam = mongoose.models.ShoppingScam || mongoose.model('ShoppingScam', shoppingScamSchema);
