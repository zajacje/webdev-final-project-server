import * as likesDao from "./likes-dao.js";

const LikesController = (app) => {

  const userLikesRecipe = async (req, res) => {
    const uid = req.session["currentUser"]._id;
    const { rid } = req.params;
    const { recipeName } = req.body;

    const newLike = await likesDao.userLikesRecipe(uid, rid, recipeName);
    res.json(newLike);
  };

  const userUnlikesRecipe = async (req, res) => {
    const uid = req.session["currentUser"]._id;
    const { rid } = req.params;

    const status = await likesDao.userUnlikesRecipe(uid, rid);
    res.send(status);
  };
  
  const findAllLikes = async (req, res) => {
    const likes = await likesDao.findAllLikes();
    res.json(likes);
  };

  const findRecipesLikedByUser = async (req, res) => {
    const uid = req.session["currentUser"]._id;

    const recipes = await likesDao.findRecipesLikedByUser(uid);
    res.json(recipes);
  };

  const findUsersThatLikeRecipe = async (req, res) => {
    const { rid } = req.params;

    const users = await likesDao.findUsersThatLikeRecipe(rid);
    res.json(users);
  };
  
  app.post("/likes/:rid", userLikesRecipe);
  app.delete("/likes/:rid", userUnlikesRecipe);
  app.get("/likes", findAllLikes);
  app.get("/users/:uid/likes", findRecipesLikedByUser);
  app.get("/recipes/:rid/likes", findUsersThatLikeRecipe);

};

export default LikesController;
