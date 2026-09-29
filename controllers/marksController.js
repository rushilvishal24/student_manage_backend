import Marks from '../models/Marks.js';
import Student from '../models/Student.js';

// This controller manages student marks and result entry.
export const getAllMarks = async (req, res) => {
  try {
    const marks = await Marks.find()
      .populate('student')
      .populate('subject')
      .sort({ createdAt: -1 });

    res.status(200).json({ marks });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch marks.' });
  }
};

export const addMarks = async (req, res) => {
  try {
    const { student, subject, examType, marks } = req.body;

    if (!student || !subject || !examType || marks === undefined) {
      return res.status(400).json({ message: 'Student, subject, exam type, and marks are required.' });
    }

    const newMarks = await Marks.create({
      student,
      subject,
      examType,
      marks
    });

    res.status(201).json({
      message: 'Marks added successfully.',
      marks: newMarks
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Marks creation failed.' });
  }
};

export const getMarksByStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const marks = await Marks.find({ student: req.params.studentId })
      .populate('subject')
      .sort({ createdAt: -1 });

    res.status(200).json({ student, marks });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch marks.' });
  }
};

export const updateMarks = async (req, res) => {
  try {
    const marksRecord = await Marks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!marksRecord) {
      return res.status(404).json({ message: 'Marks record not found.' });
    }

    res.status(200).json({
      message: 'Marks updated successfully.',
      marks: marksRecord
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Marks update failed.' });
  }
};

export const deleteMarks = async (req, res) => {
  try {
    const marksRecord = await Marks.findByIdAndDelete(req.params.id);

    if (!marksRecord) {
      return res.status(404).json({ message: 'Marks record not found.' });
    }

    res.status(200).json({ message: 'Marks deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Marks delete failed.' });
  }
};
