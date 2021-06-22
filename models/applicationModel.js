import mongoose from 'mongoose';
import validator from 'validator';

const applicationSchema = new mongoose.Schema({
  position: {
    type: String,
    enum: ['foh', 'boh', 'prep'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email address'],
  },
  phone: {
    type: String,
    required: true,
  },
  question1: {
    type: String,
    required: true,
  },
  question2: {
    type: String,
    required: true,
  },
  question3: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  isViewed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Application ||
  mongoose.model('Application', applicationSchema);
