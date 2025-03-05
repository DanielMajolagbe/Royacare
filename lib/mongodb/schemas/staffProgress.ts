import { Schema, model, models } from 'mongoose';

const staffProgressSchema = new Schema({
  staffId: {
    type: String,
    required: true,
    unique: true,
  },
  currentStage: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export const StaffProgress = models.StaffProgress || model('StaffProgress', staffProgressSchema); 