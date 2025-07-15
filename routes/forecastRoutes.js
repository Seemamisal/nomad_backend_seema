const express = require('express');
const router = express.Router();
const pool = require('../db'); 

router.get('/forecast', async (req, res) => {
  try {
    const { city, days = 7 } = req.query;

    const result = await pool.query('SELECT cost FROM cities WHERE LOWER(city) = LOWER($1)', [city]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'City not found in lifestyle data' });
    }

    const dailyCost = result.rows[0].cost * 100; // 88 score → ₹8800 approx
    const hiddenFees = 100;
    const surgeMultiplier = 1.1;

    const totalCost = Math.round((dailyCost * days + hiddenFees) * surgeMultiplier);

    res.json({
      city,
      days: Number(days),
      dailyCost,
      hiddenFees,
      surgeMultiplier,
      totalCost
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
