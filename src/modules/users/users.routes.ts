import { Router } from "express";
import AllUsersController from "./users.controller";
import authMiddleware, { role } from "../../middlewares/authMiddleware";
const allUsersRoutes = Router();

allUsersRoutes.get("/all-users", authMiddleware(role.admin), AllUsersController.getAllRandomUsers);
allUsersRoutes.get("/admin", authMiddleware(role.admin), AllUsersController.checkIfAdmin);
allUsersRoutes.patch("/make-admin", authMiddleware(role.admin), AllUsersController.createANewAdmin);
allUsersRoutes.patch("/remove-admin", authMiddleware(role.admin), AllUsersController.removeAAdmin);
allUsersRoutes.put("/user-info", AllUsersController.updateUserInfo);
allUsersRoutes.delete("/remove-user", authMiddleware(role.admin), AllUsersController.removeAUser);

export default allUsersRoutes;
