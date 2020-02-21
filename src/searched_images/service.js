/* eslint-disable class-methods-use-this */
const SearchedImagesRepository = require('./repository');
// TODO spit one service to many where each one has one responsobility
class SearchedImagesRecordService {
  async createHistorySearchRecord(params) {
    const {
      historyQuery,
      user: { id },
    } = params;
    console.log(historyQuery, id);
    const data = await SearchedImagesRepository.create({
      historyQuery,
      userId: id,
    });
    console.log(data);
  }
}

module.exports = SearchedImagesRecordService;
