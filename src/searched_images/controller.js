/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
const SearchedImagesService = require('./service');

const service = new SearchedImagesService();
class SearchedImagesController {
  search(req, res, next) {
    const { q } = req.query;
    if (!q) {
      return res.render('search');
    }
    service.createHistorySearchRecord({ historyQuery: q, user: req.user });
    return res.render('search', { gifs: 'kek' });
  }

  searchedImages() {}
}

module.exports = SearchedImagesController;
