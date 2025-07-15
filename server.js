const express = require('express');
const cors = require('cors');
require('dotenv').config();

const lifestyleRoutes = require('./routes/lifestyleRoutes');
const forecastRoutes = require('./routes/forecastRoutes');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Nomad Backend is running successfully!');
});

// Routes
app.use('/api', lifestyleRoutes);
app.use('/api', forecastRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
