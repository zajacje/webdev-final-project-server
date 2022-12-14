import mongoose from "mongoose";

const plansSchema = mongoose.Schema({
    name: {type: String, required: true},
}, {collection: 'plans'})

export default plansSchema;