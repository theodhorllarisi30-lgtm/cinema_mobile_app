const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

// Δημιουργία κράτησης
router.post('/', authenticateToken, async (req, res) => {
  const { user_id } = req.user; // τώρα υπάρχει
  const { cinema_id, movie_id, date, time } = req.body;

  try {
    await pool.query(
      'INSERT INTO reservations (user_id, cinema_id, movie_id, date, time) VALUES (?, ?, ?, ?, ?)',
      [user_id, cinema_id, movie_id, date, time]
    );
    res.json({ message: 'Η κράτηση δημιουργήθηκε!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Σφάλμα κατά τη δημιουργία κράτησης' });
  }
});


// Προβολή κρατήσεων χρήστη
router.get('/user', authenticateToken, async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const [rows] = await pool.query(
      `SELECT r.reservation_id, r.user_id, r.movie_id, r.cinema_id, r.date, r.time,
              m.title AS movie_title, c.name AS cinema_name, c.location
       FROM reservations r
       JOIN Movies m ON r.movie_id = m.movie_id
       JOIN Cinemas c ON r.cinema_id = c.cinema_id
       WHERE r.user_id = ?`,
      [user_id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Σφάλμα κατά την ανάκτηση κρατήσεων' });
  }
});

// Διαγραφή κράτησης
router.delete('/:id', authenticateToken, async (req, res) => {
  const user_id = Number(req.user.user_id);
  const reservation_id = Number(req.params.id);

  try {
    const [result] = await pool.query(
      'DELETE FROM reservations WHERE reservation_id = ? AND user_id = ?',
      [reservation_id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Δεν βρέθηκε η κράτηση ή δεν ανήκει στον χρήστη' });
    }

    res.json({ message: 'Η κράτηση διαγράφηκε!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Σφάλμα κατά τη διαγραφή κράτησης' });
  }
});

// Ενημέρωση κράτησης
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  const user_id = req.user.user_id;

  try {
    const [result] = await pool.query(
      `UPDATE reservations 
       SET date = ?, time = ? 
       WHERE reservation_id = ? AND user_id = ?`,
      [date, time, id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Δεν βρέθηκε η κράτηση ή δεν ανήκει στον χρήστη' });
    }

    res.json({ message: 'Η κράτηση ενημερώθηκε επιτυχώς!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Σφάλμα κατά την ενημέρωση κράτησης' });
  }
});

module.exports = router;
