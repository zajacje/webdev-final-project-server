import * as plansDao from "./plans-dao.js";
import * as membershipsDao from "../memberships/memberships-dao.js";
import * as postsDao from '../posts/posts-dao.js'

const PlansController = (app) => {

    const userCreatesPlan = async (req, res) => {
        const uid = req.session['currentUser']._id
        const {name} = req.body;

        const newPlan = await plansDao.createPlan(name);
        const newMembership = await membershipsDao.createMembership(uid, newPlan._id, 'owner');
        res.json({plan: newPlan, memberhsip: newMembership});
    }
    const findAllPlans = async (req, res) => {
        const plans = await plansDao.findAllPlans()
        res.json(plans)
    }
    const deletePlan = async (req, res) => {
        const {pid} = req.params;
        const planStatus = await plansDao.deletePlan(pid);
        const membershipsStatus = await membershipsDao.deleteAllMembershipsForPlan(pid);
        const postsStatus = await postsDao.deleteAllPostsForPlan(pid);
        res.json({planStatus: planStatus, membershipsStatus: membershipsStatus, postsStatus: postsStatus});
    }
    const updatePlan = async (req, res) => {
        const {pid} = req.params;
		const planUpdates = req.body;
        const updatedPlan = await plansDao.updatePlan(pid, planUpdates);
		res.json(updatedPlan);
    }

    app.post('/plans', userCreatesPlan)
    app.get('/plans', findAllPlans)
    app.delete('/plans/:pid', deletePlan)
    app.put('/plans/:pid', updatePlan)
}

export default PlansController;