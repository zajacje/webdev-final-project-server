import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true},
    recipeId: {type: String, required: true},
    recipeName: {type: String, required: true}
}, {collection: 'likes'})
export default likesSchema;