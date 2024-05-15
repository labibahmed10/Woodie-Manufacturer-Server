import { Router } from "express";
import AllUsersController from "./users.controller";
import authMiddleware, { role } from "../../middlewares/authMiddleware";
const allUsers = Router();

allUsers.get("/all-users", authMiddleware(role.admin), AllUsersController.getAllRandomUsers);
allUsers.get("/admin", authMiddleware(role.admin), AllUsersController.checkIfAdmin);
allUsers.patch("/make-admin", authMiddleware(role.admin), AllUsersController.createANewAdmin);
allUsers.put("/user-info", authMiddleware, AllUsersController.updateUserInfo);

export default allUsers;
