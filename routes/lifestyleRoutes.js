const express = require('express');
const router = express.Router();
const { getLifestyleData } = require('../controllers/lifestyleController');
const pool = require('../db');

// Existing lifestyle route
router.get('/lifestyle', getLifestyleData);

// ✅ New lifestyle-meter route
router.get('/lifestyle-meter', async (req, res) => {
  const { country } = req.query;

  try {
    const result = await pool.query(
      `SELECT country, internet_speed, crime_rate, nightlife_score, wellness_score, cost_of_living, community_score 
       FROM countries 
       WHERE LOWER(country) = LOWER($1)`,
      [country]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Country not found' });
    }

    const data = result.rows[0];

    res.json({
      country: data.country,
      internet: data.internet_speed,
      safety: data.crime_rate,
      nightlife: data.nightlife_score,
      wellness: data.wellness_score,
      cost: data.cost_of_living,
      community: data.community_score,
    });
  } catch (err) {
    console.error('❌ Error in /lifestyle-meter:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
