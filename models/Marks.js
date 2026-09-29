import mongoose from 'mongoose';

// This model stores student marks and examination results for subjects.
const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  examType: {
    type: String,
    enum: ['Quiz', 'Midterm', 'Final', 'Assignment'],
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Marks = mongoose.model('Marks', marksSchema);

export default Marks;
