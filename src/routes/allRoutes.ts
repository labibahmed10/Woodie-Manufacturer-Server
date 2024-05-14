import { Router } from "express";
import toolsRoutes from "../modules/tools/tools.routes";
const allRoutes = Router();

const routes = [
  {
    path: "/",
    route: toolsRoutes,
  },
];
routes.forEach((route) => allRoutes.use(route.path, route.route));
export default allRoutes;
