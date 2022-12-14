import mongoose from "mongoose";

const membershipsSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    plan: {type: mongoose.Schema.Types.ObjectId, ref: 'PlanModel'},
    role: {
        type: String,
        enum: ['guest', 'planner', 'owner'],
        default: 'guest'
    }
}, {collection: 'memberships'})

export default membershipsSchema;