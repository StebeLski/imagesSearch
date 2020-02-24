const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './db.sqlite';

const db = new sqlite3.Database(DBSOURCE, (error) => {
  if (error) {
    // Cannot open database
    console.error(error.message);
    throw error;
  }
});

module.exports = db;
