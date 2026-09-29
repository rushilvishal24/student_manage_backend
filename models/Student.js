import mongoose from 'mongoose';

// This model stores the main information for each student in the college.
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  registerNumber: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  section: { type: String, required: true },
  batch: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  parentName: { type: String, required: true },
  parentPhone: { type: String, required: true },
  profilePhoto: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
