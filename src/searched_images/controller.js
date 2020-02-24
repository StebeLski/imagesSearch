/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
const SearchedImagesService = require('./service');
const LikedImagesService = require('../likes/service');

// const service = new SearchedImagesService();

class SearchedImagesController {
  constructor() {
    this.service = new SearchedImagesService();
    this.likedImageService = new LikedImagesService();
  }

  search = async (req, res, next) => {
    const { q } = req.query;
    if (!q) {
      return res.render('search');
    }

    await this.service.createHistorySearchRecord({
      historyQuery: q,
      userId: req.user.id,
    });
    const searchedGifs = await this.service.callPicturesApi({
      q: encodeURIComponent(q),
    });

    const userLikedGifs = await this.likedImageService.getAllUsersLikes({
      userId: req.user.id,
    });

    const filteredGifs = this.likedImageService.compareLikedAndSearched({
      userliked: userLikedGifs,
      searchedGifs,
    });

    return res.render('search', { gifs: searchedGifs });
  };

  searchedImages = async (req, res, next) => {
    const getHistoryRecords = await this.service.getHistoryLog({
      userId: req.user.id,
    });
    res.render('recordshistory', {
      records: getHistoryRecords,
      layout: 'basic',
    });
  };
}

module.exports = new SearchedImagesController();
