/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */

class SearchedImagesController {
  search(req, res, next) {
    res.send(req.user);
  }

  searchedImages() {}
}

module.exports = SearchedImagesController;
