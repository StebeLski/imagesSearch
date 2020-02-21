/* eslint-disable class-methods-use-this */
const axios = require('axios');
const SearchedImagesRepository = require('./repository');
// TODO spit one service to many where each one has one responsobility
class SearchedImagesRecordService {
  async createHistorySearchRecord(params) {
    const {
      historyQuery,
      user: { id },
    } = params;
    await SearchedImagesRepository.create({
      historyQuery,
      userId: id,
    });
  }

  async callPicturesApi(params) {
    const { q } = params;
    try {
      const alert = await axios.get(
        `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${process.env.APIKEYFROMGIPHY}&limit=3`,
      );
      return alert.data.data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = SearchedImagesRecordService;
