const SearchedImagesService = require('./service');

class LikesController {
  constructor() {
    this.service = new SearchedImagesService();
  }

  async allUsersLikes(req, res, next) {
    const usersLikes = await this.service.getAllUsersLikes({
      userId: req.user.id,
    });
    let getLikedImagesFromApi = '';
    if (usersLikes.length !== 0) {
      getLikedImagesFromApi = await this.service.getLikedImagesFromApi(
        usersLikes,
      );
    } else {
      getLikedImagesFromApi = '';
    }
    return res.render('likedimages', { gifs: getLikedImagesFromApi });
  }

  async addlike(req, res, next) {
    await this.service.createAddLike({
      imageId: req.body.imageId,
      userId: req.user.id,
    });
  }
}

module.exports = new LikesController();
