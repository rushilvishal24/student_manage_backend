import express from 'express';
import {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
} from '../controllers/subjectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);
router.post('/', authMiddleware, createSubject);
router.put('/:id', authMiddleware, updateSubject);
router.delete('/:id', authMiddleware, deleteSubject);

export default router;
