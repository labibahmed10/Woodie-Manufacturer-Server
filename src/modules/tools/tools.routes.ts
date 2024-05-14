import { Router } from "express";
import ToolsController from "./tools.controller";
const toolsRoutes = Router();

toolsRoutes.get("/allTools", ToolsController.getAllTools);
toolsRoutes.post("/create", ToolsController.createTool);

toolsRoutes.get("/allTools/:id", ToolsController.getSingleTools);
toolsRoutes.patch("/allTools/:id", ToolsController.updateSingleTool);
toolsRoutes.delete("/allTools/:id", ToolsController.deleteTool);

export default toolsRoutes;
