import Faculty from '../models/Faculty.js';

// This controller manages faculty records and their basic information.
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ createdAt: -1 });
    res.status(200).json({ faculty });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch faculty.' });
  }
};

export const createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json({
      message: 'Faculty added successfully.',
      faculty
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Faculty creation failed.' });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found.' });
    }

    res.status(200).json({
      message: 'Faculty updated successfully.',
      faculty
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Faculty update failed.' });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found.' });
    }

    res.status(200).json({ message: 'Faculty deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Faculty delete failed.' });
  }
};
