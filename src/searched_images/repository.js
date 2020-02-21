const db = require('../db');

class SearchedImagesRepository {
  static async create(params) {
    const { historyQuery, userId } = params;
    const insert = 'INSERT INTO searched_images (query, user_id) VALUES (?,?)';
    return db.run(insert, [historyQuery, userId], (err) => {
      if (err) {
        console.log('tru');
        return new Error();
      }
    });
  }
}

module.exports = SearchedImagesRepository;
