const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const studentsRouter = require('./routes/students');

dotenv.config();

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/certificacion';
const PORT = process.env.PORT || 3000;

app.use('/api/students', studentsRouter);

app.get('/', (req, res) => res.send('Practica5 - API de cursos'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err && err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  res.status(500).json({ message: 'Server error' });
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
