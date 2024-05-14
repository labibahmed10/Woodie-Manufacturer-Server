import { Router } from "express";
import PurchaseInfoController from "./purchaseInfo.controller";
const purchaseInfoRoutes = Router();

purchaseInfoRoutes.get("/purchase-info", PurchaseInfoController.getAllPurchaseInfo);

export default purchaseInfoRoutes;
