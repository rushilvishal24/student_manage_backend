import express from 'express';
import {
  getAllAttendance,
  addAttendance,
  getAttendanceByStudent,
  getAttendanceBySubject,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendanceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllAttendance);
router.post('/', authMiddleware, addAttendance);
router.get('/student/:studentId', authMiddleware, getAttendanceByStudent);
router.get('/subject/:subjectId', authMiddleware, getAttendanceBySubject);
router.put('/:id', authMiddleware, updateAttendance);
router.delete('/:id', authMiddleware, deleteAttendance);

export default router;
