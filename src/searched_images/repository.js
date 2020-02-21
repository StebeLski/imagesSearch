const db = require('../db');
const knex = require('../db/knex');

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
    const data = await knex('searched_images').where({ user_id: userId });
    return data;
  }
}

module.exports = SearchedImagesRepository;
