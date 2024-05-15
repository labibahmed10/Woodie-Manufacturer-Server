import { Router } from "express";
import ToolsController from "./tools.controller";
import authMiddleware, { role } from "../../middlewares/authMiddleware";
const toolsRoutes = Router();

toolsRoutes.get("/allTools", ToolsController.getAllTools);
toolsRoutes.post("/create", authMiddleware(role.admin), ToolsController.createTool);

toolsRoutes.get("/allTools/:id", ToolsController.getSingleTools);
toolsRoutes.patch("/allTools/:id", authMiddleware, ToolsController.updateSingleTool);
toolsRoutes.delete("/allTools/:id", authMiddleware(role.admin), ToolsController.deleteTool);

export default toolsRoutes;
