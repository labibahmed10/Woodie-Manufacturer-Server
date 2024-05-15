import { Router } from "express";
import AllUsersController from "./users.controller";
const allUsers = Router();

allUsers.get("/all-users", AllUsersController.getAllRandomUsers);
allUsers.patch("/make-admin", AllUsersController.createANewAdmin);
allUsers.put("/user-info", AllUsersController.updateUserInfo)

export default allUsers;
