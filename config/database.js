const { Pool } = require("pg");

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */ 

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
})

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register


// Expose the connection
module.exports = connection;
