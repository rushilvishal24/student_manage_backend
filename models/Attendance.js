import mongoose from 'mongoose';

// This model stores attendance records for each student per subject.
const attendanceSchema = new mongoose.Schema({
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
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
