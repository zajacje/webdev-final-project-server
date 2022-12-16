import mongoose from "mongoose";

const postsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlanModel",
      required: true,
    },
    recipeId: { type: String, required: true },
    recipeName: { type: String, required: true },
    img: { type: String, required: true },
    date: { type: Date, required: true },
    dateCreated: { type: Date, default: Date.now },
    ingredients: { type: Map, of: {owned: Boolean, amount: String}, default: {} },
    readyInMinutes: Number,
    votes: { type: Map, of: Boolean, default: {} },
  },
  { collection: "posts" }
);
export default postsSchema;
