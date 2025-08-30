const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// Εγγραφή
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Όνομα, email και password είναι υποχρεωτικά' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.json({ message: 'Ο χρήστης δημιουργήθηκε!', user_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Σφάλμα κατά την εγγραφή χρήστη' });
  }
});

// Σύνδεση
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Λάθος στοιχεία' });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Λάθος στοιχεία' });
    }

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, 'secret123', { expiresIn: '1h' });

    res.json({ message: 'Επιτυχής σύνδεση', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Σφάλμα κατά το login' });
  }
});

module.exports = router;
