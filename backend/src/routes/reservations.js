const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

// Δημιουργία κράτησης
router.post('/', authenticateToken, async (req, res) => {
  const { restaurant_id, date, time, people_count } = req.body;
  const user_id = req.user.user_id;

  if (!restaurant_id || !date || !time || !people_count) {
    return res.status(400).json({ error: 'Όλα τα πεδία είναι υποχρεωτικά' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO reservations (user_id, restaurant_id, date, time, people_count) VALUES (?, ?, ?, ?, ?)',
      [user_id, restaurant_id, date, time, people_count]
    );

    res.json({ message: 'Η κράτηση δημιουργήθηκε!', reservation_id: result.insertId });
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
	  `SELECT r.reservation_id, r.user_id, r.restaurant_id, r.date, r.time, r.people_count,
			  res.name AS restaurant_name, res.location
	   FROM reservations r
	   JOIN restaurants res ON r.restaurant_id = res.restaurant_id
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
  const { date, time, people_count } = req.body;
  const user_id = req.user.user_id;

  try {
    const [result] = await pool.query(
      `UPDATE reservations 
       SET date = ?, time = ?, people_count = ? 
       WHERE reservation_id = ? AND user_id = ?`,
      [date, time, people_count, id, user_id]
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