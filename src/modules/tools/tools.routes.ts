import { Router } from "express";
import ToolsController from "./tools.controller";
const toolsRoutes = Router();

toolsRoutes.get("/allTools", ToolsController.getAllTools);
toolsRoutes.post("/create", ToolsController.createTool);
toolsRoutes.get("/allTools/:id", ToolsController.getSingleTools);

export default toolsRoutes;
