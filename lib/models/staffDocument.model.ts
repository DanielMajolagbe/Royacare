import mongoose from 'mongoose';

const staffDocumentSchema = new mongoose.Schema({
  staffId: {
    type: String,
    required: true
  },
  documents: [{
    name: String,
    url: String,
    driveFileId: String,
    stage: Number,
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'pending'
    },
    notes: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  currentStage: {
    type: Number,
    default: 1
  }
});

const StaffDocument = mongoose.models.StaffDocument || mongoose.model('StaffDocument', staffDocumentSchema);
export default StaffDocument; 