import postsModel from "./posts-model.js";

export const createPost = async (post) => await postsModel.create(post);

export const findAllPosts = async () => await postsModel.find();

export const deletePost = async (postId) =>
  await postsModel.findOneAndDelete({ _id: postId });

export const deleteAllPostsForPlan = async (pid) => {
  await postsModel.deleteMany({ plan: pid });
};

export const updatePost = async (postId, postUpdates) =>
  await postsModel.findOneAndUpdate(
    { _id: postId },
    { $set: postUpdates },
    { new: true }
  );

export const updateIngredient = async (postId, ingredient, owned) =>
  await postsModel.findOneAndUpdate(
    { _id: postId },
    {
      $set: {
        [`ingredients.${ingredient}.owned`]: owned,
      },
    },
    { new: true }
  )
  .populate("user")
  .exec();

export const findPostsForUser = async (uid) => {
  return await postsModel
    .find({ user: uid }, { user: false })
    .populate("plan")
    .sort({dateCreated:"descending"})
    .exec();
};

export const findPostsForPlan = async (pid) => {
  return await postsModel
    .find({ plan: pid }, { plan: false })
    .populate("user")
    .sort({date:"ascending"})
    .exec();
};

export const voteForPost = async (postId, uid, vote) => {
  if (vote === "removed") {
    return await postsModel.findOneAndUpdate(
      { _id: postId },
      {
        $unset: {
          [`votes.${uid}`]: true,
        },
      },
      { new: true }
    )
    .populate("user")
    .exec();
  } else {
    return await postsModel.findOneAndUpdate(
      { _id: postId },
      {
        $set: {
          [`votes.${uid}`]: vote === "upvoted",
        },
      },
      { new: true }
    )
    .populate("user")
    .exec();
  }
};
