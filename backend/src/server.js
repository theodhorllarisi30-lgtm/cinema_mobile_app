const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();

// middleware για να μπορεί να διαβάζει JSON
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

// health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const reservationRoutes = require('./routes/reservations');
app.use('/api/reservations', reservationRoutes);
const cinemasRouter = require('./routes/cinemas');
app.use('/api/cinemas', cinemasRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
