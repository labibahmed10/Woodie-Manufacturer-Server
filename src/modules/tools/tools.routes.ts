import { Router } from "express";
import ToolsController from "./tools.controller";
import authMiddleware, { role } from "../../middlewares/authMiddleware";
const toolsRoutes = Router();

toolsRoutes.get("/all-tools", ToolsController.getAllTools);
toolsRoutes.post("/create", authMiddleware(role.admin), ToolsController.createTool);

toolsRoutes.get("/all-tools/:id", ToolsController.getSingleTools);
toolsRoutes.patch("/all-tools/:id", ToolsController.updateSingleTool);
toolsRoutes.delete("/all-tools/:id", authMiddleware(role.admin), ToolsController.deleteTool);

export default toolsRoutes;
