const Review = require('../models/Review');
const School = require('../models/School');

// Add a review to a school
const addReview = async (req, res) => {
  const { user, rating, comment } = req.body;
  const schoolId = req.params.id;

  try {
    const review = new Review({ user, rating, comment, school: schoolId });
    await review.save();

    const school = await School.findById(schoolId);
    school.reviews.push(review._id);
    await school.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview };