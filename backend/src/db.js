const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       
  password: '',        
  database: 'restaurant_app'
});

module.exports = pool;