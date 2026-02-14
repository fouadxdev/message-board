const pool = require("./pool");

// Get all messages
async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC",
  );
  return rows;
}

// Insert a new message
async function insertMessage(username, messageText) {
  await pool.query(
    "INSERT INTO messages (username, message_text) VALUES ($1, $2)",
    [username, messageText],
  );
}

// Get a single message by ID
async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

// Search messages by username (SQL LIKE search)
async function searchMessages(searchTerm) {
  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE username ILIKE $1 ORDER BY added DESC",
    [`%${searchTerm}%`]
  );
  return rows;
}

module.exports = {
  getAllMessages,
  insertMessage,
  getMessageById,
  searchMessages
};
