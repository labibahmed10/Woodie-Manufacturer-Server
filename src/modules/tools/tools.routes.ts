import { Router } from "express";
import ToolsController from "./tools.controller";
import authMiddleware, { role } from "../../middlewares/authMiddleware";
const toolsRoutes = Router();

toolsRoutes.get("/all-tools", ToolsController.getAllTools);
toolsRoutes.post("/create-tool", authMiddleware(role.admin), ToolsController.createTool);

toolsRoutes.get("/all-tools/:id", ToolsController.getSingleTools);
toolsRoutes.delete("/all-tools/:id", authMiddleware(role.admin), ToolsController.deleteTool);
toolsRoutes.patch("/all-tools/:id", ToolsController.updateSingleTool);

export default toolsRoutes;
