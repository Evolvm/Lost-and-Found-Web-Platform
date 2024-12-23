const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Connect to the database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to the database');
});

// Function to get the user By the email
const getUserByEmail = async (email) => {
    try {
      const query = 'SELECT * FROM user_info WHERE user_email = ?';
      const [rows] = await db.promise().query(query, [email]);
      
      // Check if the query returned any rows
      if (rows.length > 0) {
        return rows[0];
      } else {
        return null; // No user found with the given email
      }
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      throw error; // Propagate the error to the caller
    }
}

const getUserById = async (id) => {
  try {
    const query = 'SELECT * FROM user_info WHERE user_id = ?';
    const [rows] = await db.promise().query(query, [id]);
    
    // Check if the query returned any rows
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null; // No user found with the given email
    }
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    throw error; // Propagate the error to the caller
  }
}

module.exports = {
  db,
  getUserByEmail,
  getUserById,
};