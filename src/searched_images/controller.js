/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
const SearchedImagesService = require('./service');

const service = new SearchedImagesService();

class SearchedImagesController {
  async search(req, res, next) {
    const { q } = req.query;
    if (!q) {
      return res.render('search');
    }

    await service.createHistorySearchRecord({
      historyQuery: q,
      userId: req.user.id,
    });
    const searchedGifs = await service.callPicturesApi({
      q: encodeURIComponent(q),
    });
    return res.render('search', { gifs: searchedGifs });
  }

  async searchedImages(req, res, next) {
    const getHistoryRecords = await service.getHistoryLog({
      userId: req.user.id,
    });
    res.render('recordshistory', {
      records: getHistoryRecords,
      layout: 'basic',
    });
  }
}

module.exports = new SearchedImagesController();
