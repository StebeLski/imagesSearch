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

  async getHistoryLog(params) {
    const { userId } = params;
    const allUserHistoryRecords = await SearchedImagesRepository.getAllUserRecords(
      { userId },
    );
    const queryData = allUserHistoryRecords.reduce((a, b) => {
      const { id, user_id, ...query } = b;
      a.push(query);
      return a;
    }, []);
    return queryData;
  }
}

module.exports = SearchedImagesRecordService;
