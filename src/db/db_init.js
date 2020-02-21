/* eslint-disable no-console */
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const DBSOURCE = './db.sqlite';

const db = new sqlite3.Database(DBSOURCE, (error) => {
  if (error) {
    // Cannot open database
    console.error(error.message);
    throw error;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(
      `CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE, 
            password text, 
            CONSTRAINT name_unique UNIQUE (name)
            )`,
      (err) => {
        if (err) {
          console.log('Table users already created');
        } else {
          // Table just created, creating some rows
          const insert = 'INSERT INTO users (name, password) VALUES (?,?)';
          db.run(insert, ['test', bcrypt.hashSync('test', 10)]);
        }
      },
    );

    db.run(
      `CREATE TABLE searched_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        query text, 
        user_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT SI_fk_user_id FOREIGN KEY (user_id)
        REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE)`,
      (err) => {
        if (err) {
          console.log('Table searched_images already created');
          console.log(err);
        }
      },
    );

    db.run(
      `CREATE TABLE likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      user_id INTEGER,
      external_id INTEGER UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      CONSTRAINT external_id_unique UNIQUE (external_id),
      CONSTRAINT Likes_fk_user_id FOREIGN KEY (user_id)
      REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE)`,
      (err) => {
        if (err) {
          console.log('Table likes already created');
          console.log(err);
        }
      },
    );
  }
});
