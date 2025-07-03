const pool = require('../db');

exports.getLifestyleData = async (req, res) => {
  const { city } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM cities WHERE LOWER(city) = LOWER($1)',
      [city]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error fetching city:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
