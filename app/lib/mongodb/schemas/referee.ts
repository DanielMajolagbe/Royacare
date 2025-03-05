import { Schema, model, models } from 'mongoose';

const refereeSchema = new Schema({
  staffId: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  adminNotes: {
    type: String,
    default: '',
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

export const Referee = models.Referee || model('Referee', refereeSchema); 