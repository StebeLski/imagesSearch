const db = require('../db');
const knex = require('../db/knex');

class SearchedImagesRepository {
  static async createAddLike(params) {
    const { imageId, userId } = params;
    const insert = 'INSERT INTO likes (external_id, user_id) VALUES (?,?)';
    return db.run(insert, [imageId, userId], (err) => {
      if (err) {
        return new Error();
      }
    });
  }

  static async getAllUserLikes(params) {
    const { userId } = params;
    const data = await knex('searched_images')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc');
    return data;
  }
}

module.exports = SearchedImagesRepository;
