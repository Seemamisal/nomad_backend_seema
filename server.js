const express = require('express');
const cors = require('cors');
require('dotenv').config();

const lifestyleRoutes = require('./routes/lifestyleRoutes');
const forecastRoutes = require('./routes/forecastRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Nomad Backend is running successfully!');
});

app.use('/api', lifestyleRoutes);
app.use('/api', forecastRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
