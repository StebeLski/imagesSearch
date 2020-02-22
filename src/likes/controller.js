/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
const SearchedImagesService = require('./service');

const service = new SearchedImagesService();

class LikesController {
  async checklikes(req, res, next) {}

  async addlike(req, res, next) {
    await service.createAddLike({
      imageId: req.body.imageid,
      userId: req.user.id,
    });
  }
}

module.exports = new LikesController();
