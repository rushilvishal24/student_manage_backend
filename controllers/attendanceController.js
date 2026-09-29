import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';
import Subject from '../models/Subject.js';

// This controller manages student attendance records and percentage calculation.
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate('student')
      .populate('subject')
      .populate('faculty')
      .sort({ date: -1 });

    res.status(200).json({ attendance });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch attendance records.' });
  }
};

export const addAttendance = async (req, res) => {
  try {
    const { student, subject, faculty, date, status } = req.body;

    if (!student || !subject || !faculty || !status) {
      return res.status(400).json({ message: 'Student, subject, faculty, and status are required.' });
    }

    const attendanceExists = await Attendance.findOne({
      student,
      subject,
      date: new Date(date || Date.now()).toISOString().slice(0, 10)
    });

    if (attendanceExists) {
      return res.status(409).json({ message: 'Attendance already recorded for this date.' });
    }

    const newAttendance = await Attendance.create({
      student,
      subject,
      faculty,
      date: date || Date.now(),
      status
    });

    res.status(201).json({
      message: 'Attendance recorded successfully.',
      attendance: newAttendance
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Attendance creation failed.' });
  }
};

export const getAttendanceByStudent = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.studentId })
      .populate('subject')
      .populate('faculty')
      .populate('student')
      .sort({ date: -1 });

    const student = await Student.findById(req.params.studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const totalClasses = attendance.length;
    const classesAttended = attendance.filter((item) => item.status === 'Present').length;
    const attendancePercentage = totalClasses > 0 ? ((classesAttended / totalClasses) * 100).toFixed(2) : 0;

    res.status(200).json({
      student,
      attendance,
      summary: {
        totalClasses,
        classesAttended,
        attendancePercentage
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch attendance.' });
  }
};

export const getAttendanceBySubject = async (req, res) => {
  try {
    const attendance = await Attendance.find({ subject: req.params.subjectId })
      .populate('student')
      .populate('faculty')
      .sort({ date: -1 });

    const subject = await Subject.findById(req.params.subjectId);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found.' });
    }

    res.status(200).json({ subject, attendance });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch subject attendance.' });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found.' });
    }

    res.status(200).json({
      message: 'Attendance updated successfully.',
      attendance
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Attendance update failed.' });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found.' });
    }

    res.status(200).json({ message: 'Attendance deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Attendance delete failed.' });
  }
};
