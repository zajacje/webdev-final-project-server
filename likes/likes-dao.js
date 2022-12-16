import likesModel from "./likes-model.js";

export const userLikesRecipe = async (uid, rid, recipeName) => {
  return await likesModel.create({
    user: uid,
    recipeId: rid,
    recipeName: recipeName,
  });
};

export const userUnlikesRecipe = async (uid, rid) => {
  return await likesModel.findOneAndDelete({ user: uid, recipeId: rid });
};

export const findRecipesLikedByUser = async (uid) => {
  return await likesModel
    .find({ user: uid }, { user: false, _id: false })
    .exec();
};

export const findUsersThatLikeRecipe = async (rid) => {
  return await likesModel
    .find({ recipeId: rid }, { recipeId: false, recipeName: false })
    .populate("user", "username")
    .exec();
};

export const findAllLikes = async () => await likesModel.find().sort({_id: "descending"}).populate("user")
.exec();
