import membershipsModel from "./memberships-model.js";

export const createMembership = async (uid, pid, newRole) => {
    return await membershipsModel.create({user: uid, plan: pid, role: newRole})
}
export const deleteMembership = async(uid, pid) => {
    return await membershipsModel.deleteOne({user: uid, plan: pid})
}
export const deleteAllMembershipsForPlan = async(pid) => {
    return await membershipsModel.deleteMany({plan: pid})
}
export const findAllMemberships = async () =>
    await membershipsModel.find()

export const updateMembership = async (uid, pid, membershipUpdates) =>
    await membershipsModel.findOneAndUpdate({user: uid, plan: pid},
        {$set: membershipUpdates})

export const findPlansForUser = async(uid) => {
    return await membershipsModel
        .find({user: uid}, {user: false, _id: false})
        .populate('plan')
        .exec()
}
export const findUsersForPlan = async(pid) => {
    return await membershipsModel
        .find({plan: pid}, {plan: false, _id: false})
        .populate('user')
        .exec()
}