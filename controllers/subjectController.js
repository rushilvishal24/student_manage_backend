import Subject from '../models/Subject.js';

// This controller manages subjects available in each department.
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('faculty').sort({ createdAt: -1 });
    res.status(200).json({ subjects });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch subjects.' });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('faculty');

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found.' });
    }

    res.status(200).json({ subject });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch subject details.' });
  }
};

export const createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json({
      message: 'Subject created successfully.',
      subject
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Subject creation failed.' });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found.' });
    }

    res.status(200).json({
      message: 'Subject updated successfully.',
      subject
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Subject update failed.' });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found.' });
    }

    res.status(200).json({ message: 'Subject deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Subject delete failed.' });
  }
};
