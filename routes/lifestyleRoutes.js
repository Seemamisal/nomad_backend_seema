const express = require('express');
const router = express.Router();
const { getLifestyleData } = require('../controllers/lifestyleController');

router.get('/lifestyle', getLifestyleData);

module.exports = router;
