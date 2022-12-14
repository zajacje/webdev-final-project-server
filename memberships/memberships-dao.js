import membershipsModel from "./memberships-model.js";

export const createMembership = async (uid, pid, newRole) => {
  let newPlan = await membershipsModel.create({ user: uid, plan: pid, role: newRole });
  return await membershipsModel.findOne({_id: newPlan._id})
  .populate("user")
  .exec();
};

export const deleteMembership = async (uid, pid) => {
  return await membershipsModel.findOneAndDelete({ user: uid, plan: pid })
  .populate("user")
    .exec();
};

export const deleteAllMembershipsForPlan = async (pid) => {
  return await membershipsModel.deleteMany({ plan: pid });
};

export const findAllMemberships = async () =>
  await membershipsModel
    .find()
    .populate("user", "username")
    .populate("plan", "name")
    .exec();

export const updateMembership = async (uid, pid, membershipUpdates) =>
  await membershipsModel.findOneAndUpdate(
    { user: uid, plan: pid },
    { $set: membershipUpdates },
    { new: true }
  );

export const findPlansForUser = async (uid) => {
  return await membershipsModel
    .find({ user: uid }, { user: false, _id: false })
    .populate("plan")
    .exec();
};

export const findUsersForPlan = async (pid) => {
  return await membershipsModel
    .find({ plan: pid }, { plan: false, _id: false })
    .populate("user")
    .exec();
};
