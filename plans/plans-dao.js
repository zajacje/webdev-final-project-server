import plansModel from "./plans-model.js";

export const createPlan = async (planName) =>
    await plansModel.create({name: planName})

export const findAllPlans = async () =>
    await plansModel.find()

export const deletePlan = async (pid) =>
    await plansModel.deleteOne({_id: pid})

export const updatePlan = async (pid, planUpdates) =>
    await plansModel.findOneAndUpdate({_id: pid},
        {$set: planUpdates}, {new: true})

export const findPlanById = (pid) =>
    plansModel.findById(pid)