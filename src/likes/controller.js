const SearchedImagesService = require('./service');

class LikesController {
  constructor() {
    this.service = new SearchedImagesService();
  }

  allUsersLikes = async (req, res, next) => {
    const usersLikes = await this.service.getAllUsersLikes({
      userId: req.user.id,
    });
    const getLikedImagesFromApi = await this.service.getLikedImagesFromApi(
      usersLikes,
    );
    return res.render('likedimages', { gifs: getLikedImagesFromApi });
  };

  addlike = async (req, res, next) => {
    await this.service.createAddLike({
      imageId: req.body.imageId,
      userId: req.user.id,
    });
  };
}

module.exports = new LikesController();
