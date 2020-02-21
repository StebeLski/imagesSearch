const db = require('../db');

class SearchedImagesRepository {
  static async create(params) {
    const { historyQuery, userId } = params;
    const insert = 'INSERT INTO searched_images (query, user_id) VALUES (?,?)';
    return db.run(insert, [historyQuery, userId], (err) => {
      if (err) {
        return new Error();
      }
    });
  }

  static async getAllUserRecords(params) {
    const { userId } = params;
    const select = 'SELECT * FROM searched_images WHERE user_id = ?';
    return db.all(select, [userId], (err, rows) => {
      if (err) {
        return new Error();
      }
    });
  }
}

module.exports = SearchedImagesRepository;
