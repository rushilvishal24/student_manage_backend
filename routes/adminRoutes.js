import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import Student from '../models/Student.js';
import User from '../models/User.js';
import Subject from '../models/Subject.js';
import Attendance from '../models/Attendance.js';
import Marks from '../models/Marks.js';

const router = express.Router();

router.get('/students', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch admin student data.' });
  }
});

router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch users.' });
  }
});

router.get('/reports', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalSubjects = await Subject.countDocuments();
    const totalAttendance = await Attendance.countDocuments();
    const totalMarks = await Marks.countDocuments();

    res.status(200).json({
      totalStudents,
      totalUsers,
      totalSubjects,
      totalAttendance,
      totalMarks
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to generate reports.' });
  }
});

export default router;
