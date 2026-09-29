import Student from '../models/Student.js';

// This controller handles all student CRUD operations.
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch students.' });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch student details.' });
  }
};

export const createStudent = async (req, res) => {
  try {
    const studentData = req.body;

    const newStudent = await Student.create(studentData);

    res.status(201).json({
      message: 'Student created successfully.',
      student: newStudent
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Student creation failed.' });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({
      message: 'Student updated successfully.',
      student
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Student update failed.' });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Student delete failed.' });
  }
};
