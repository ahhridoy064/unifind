const express = require('express');
const { getSchools, getSchoolById } = require('../controllers/schoolController');

const router = express.Router();

router.get('/', getSchools);
router.get('/:id', getSchoolById);

module.exports = router;