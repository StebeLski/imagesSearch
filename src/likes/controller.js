const SearchedImagesService = require('./service');

class LikesController {
  constructor() {
    this.service = new SearchedImagesService();
  }

  checklikes = async (req, res, next) => {};

  addlike = async (req, res, next) => {
    console.log(req.body);
    await this.service.createAddLike({
      imageId: req.body.imageId,
      userId: req.user.id,
    });
  };
}

module.exports = new LikesController();
