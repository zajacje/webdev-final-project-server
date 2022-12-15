import mongoose from "mongoose";

const membershipsSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true},
    plan: {type: mongoose.Schema.Types.ObjectId, ref: 'PlanModel', required: true},
    role: {
        type: String,
        enum: ['guest', 'planner', 'owner'],
        default: 'guest'
    }
}, {collection: 'memberships'})

export default membershipsSchema;