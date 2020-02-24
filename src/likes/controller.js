const SearchedImagesService = require('./service');

class LikesController {
  constructor() {
    this.service = new SearchedImagesService();
  }

  checklikes = async (req, res, next) => {};

  addlike = async (req, res, next) => {
    await this.service.createAddLike({
      imageId: req.body.imageid,
      userId: req.user.id,
    });
  };
}

module.exports = new LikesController();
