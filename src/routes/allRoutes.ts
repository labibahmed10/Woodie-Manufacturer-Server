import { Router } from "express";
import toolsRoutes from "../modules/tools/tools.routes";
import purchaseInfoRoutes from "../modules/purchaseInfo/purchaseInfo.routes";
const allRoutes = Router();

const routes = [
  {
    path: "/",
    route: toolsRoutes,
  },
  {
    path: "/",
    route: purchaseInfoRoutes,
  },
];
routes.forEach((route) => allRoutes.use(route.path, route.route));
export default allRoutes;
