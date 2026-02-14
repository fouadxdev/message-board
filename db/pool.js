const { Pool } = require("pg");

// Use connection string from environment variable
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL
});