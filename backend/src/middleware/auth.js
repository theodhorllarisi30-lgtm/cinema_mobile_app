const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: 'Δεν βρέθηκε token' });

  jwt.verify(token, 'secret123', (err, user) => {
    if (err) return res.status(403).json({ error: 'Μη έγκυρο token' });
    req.user = user; // βάζουμε το user στο request
    next();
  });
}

module.exports = authenticateToken;