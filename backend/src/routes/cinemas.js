const express = require('express');
const router = express.Router();
const db = require('../db'); // εδώ χρησιμοποιούμε db

// GET όλα τα cinema
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT cinema_id, name FROM cinemas');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Σφάλμα κατά την ανάκτηση cinemas' });
  }
});

// ταινίες ανά cinema
router.get('/:cinema_id/movies', async (req, res) => {
  const { cinema_id } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT movie_id, title FROM movies WHERE cinema_id = ?',
      [cinema_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Σφάλμα κατά την ανάκτηση ταινιών' });
  }
});

module.exports = router;
