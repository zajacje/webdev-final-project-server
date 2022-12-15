import mongoose from "mongoose";
import membershipsSchema from "./memberships-schema.js";

const membershipsModel = mongoose.model("MembershipModel", membershipsSchema);

export default membershipsModel;
