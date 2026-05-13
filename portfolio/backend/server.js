const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve API routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/blogs', require('./routes/blogs'));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Handle SPA routing: serve index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
