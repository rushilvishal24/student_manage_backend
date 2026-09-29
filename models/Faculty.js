import mongoose from 'mongoose';

// This model stores faculty details and the subjects they teach.
const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  department: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  subjects: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;
