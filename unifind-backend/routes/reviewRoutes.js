const express = require('express');
const { addReview } = require('../controllers/reviewController');

const router = express.Router();

router.post('/:id/reviews', addReview);

module.exports = router;