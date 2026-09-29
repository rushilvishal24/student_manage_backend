import express from 'express';
import {
  getAllMarks,
  addMarks,
  getMarksByStudent,
  updateMarks,
  deleteMarks
} from '../controllers/marksController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllMarks);
router.post('/', authMiddleware, addMarks);
router.get('/student/:studentId', authMiddleware, getMarksByStudent);
router.put('/:id', authMiddleware, updateMarks);
router.delete('/:id', authMiddleware, deleteMarks);

export default router;
