import * as membershipsDao from "./memberships-dao.js";

const MembershipsController = (app) => {

  const createMembership = async (req, res) => {
    const { uid, pid } = req.params;
    const { role } = req.body;

    const newMembership = await membershipsDao.createMembership(uid, pid, role);
    res.json(newMembership);
  };

  const deleteMembership = async (req, res) => {
    const { uid, pid } = req.params;

    const status = await membershipsDao.deleteMembership(uid, pid);
    res.send(status);
  };

  const deleteAllMembershipsForPlan = async (req, res) => {
    const { pid } = req.params;

    const status = await membershipsDao.deleteAllMembershipsForPlan(pid);
    res.send(status);
  };

  const updateMembership = async (req, res) => {
    const { uid, pid } = req.params;
    const userUpdates = req.body;
    const updatedMembership = await membershipsDao.updateMembership(
      uid,
      pid,
      userUpdates
    );
    res.json(updatedMembership);
  };

  const findAllMemberships = async (req, res) => {
    const memberships = await membershipsDao.findAllMemberships();
    res.json(memberships);
  };

  const findPlansForUser = async (req, res) => {
    const { uid } = req.params;

    const plans = await membershipsDao.findPlansForUser(uid);
    res.json(plans);
  };

  const findUsersForPlan = async (req, res) => {
    const { pid } = req.params;

    const users = await membershipsDao.findUsersForPlan(pid);
    res.json(users);
  };

  app.post("/memberships/:pid/:uid", createMembership);
  app.delete("/memberships/:pid/:uid", deleteMembership);
  app.put("/memberships/:pid/:uid", updateMembership);
  app.delete("/memberships/:pid/", deleteAllMembershipsForPlan);
  app.get("/memberships", findAllMemberships);
  app.get("/users/:uid/plans", findPlansForUser);
  app.get("/plans/:pid/users", findUsersForPlan);

};

export default MembershipsController;
