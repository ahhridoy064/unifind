const School = require('../models/School');

// Get all schools
const getSchools = async (req, res) => {
  try {
    const schools = await School.find().populate('reviews');
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single school by ID
const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id).populate('reviews');
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSchools, getSchoolById };