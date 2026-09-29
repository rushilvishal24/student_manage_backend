import express from 'express';
import {
  getAllFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty
} from '../controllers/facultyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllFaculty);
router.post('/', authMiddleware, createFaculty);
router.put('/:id', authMiddleware, updateFaculty);
router.delete('/:id', authMiddleware, deleteFaculty);

export default router;
