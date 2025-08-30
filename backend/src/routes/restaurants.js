const express = require('express');
const router = express.Router();
const db = require('../db'); 

// GET όλα τα εστιατόρια
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM restaurants');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Σφάλμα κατά την ανάκτηση εστιατορίων' });
  }
});

module.exports = router;
