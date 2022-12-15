import mongoose from "mongoose";
import plansSchema from "./plans-schema.js";

const plansModel = mongoose.model("PlanModel", plansSchema);

export default plansModel;
