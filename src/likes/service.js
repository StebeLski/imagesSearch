const axios = require('axios');
const LikesRepository = require('./repository');
const { toOneArray } = require('../utils/toOneArray');
// TODO split one service to many where each one has one responsobility
class SearchedImagesRecordService {
  createAddLike = async (params) => {
    const { imageId, userId } = params;
    await LikesRepository.createAddLike({
      imageId,
      userId,
    });
  };

  getAllUsersLikes = async (params) => {
    const { userId } = params;
    const allUserLikesRecords = await LikesRepository.getAllUserLikes({
      userId,
    });
    const gifs = toOneArray(allUserLikesRecords);

    return gifs;
  };

  getLikedImagesFromApi = async (gifsIdxs) => {
    const gifsIdxStr = gifsIdxs.join(',');
    console.log(gifsIdxStr);
    try {
      const likedImagesFromGiphy = await axios.get(
        `http://api.giphy.com/v1/gifs?ids=${gifsIdxStr}&api_key=${process.env.APIKEYFROMGIPHY}`,
      );
      return likedImagesFromGiphy.data.data;
    } catch (error) {
      return error;
    }
  };
}

module.exports = SearchedImagesRecordService;
