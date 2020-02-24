/* eslint-disable class-methods-use-this */
const LikesRepository = require('./repository');
// TODO split one service to many where each one has one responsobility
class SearchedImagesRecordService {
  async createAddLike(params) {
    const { imageId, userId } = params;
    await LikesRepository.createAddLike({
      imageId,
      userId,
    });
  }

  async getAllUsersLikes(params) {
    const { userId } = params;
    const allUserLikesRecords = await LikesRepository.getAllUserLikes({
      userId,
    });
    console.log(allUserLikesRecords);
  }
}

module.exports = SearchedImagesRecordService;
