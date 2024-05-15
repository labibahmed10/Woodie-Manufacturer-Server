import { Router } from "express";
import toolsRoutes from "../modules/tools/tools.routes";
import purchaseInfoRoutes from "../modules/purchaseInfo/purchaseInfo.routes";
import reviewsRoutes from "../modules/reviews/reviews.routes";
import allUsersRoutes from "../modules/users/users.routes";
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
  {
    path: "/",
    route: reviewsRoutes,
  },
  {
    path: "/",
    route: allUsersRoutes,
  },
];
routes.forEach((route) => allRoutes.use(route.path, route.route));
export default allRoutes;
