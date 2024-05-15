import { Router } from "express";
import PurchaseInfoController from "./purchaseInfo.controller";
const purchaseInfoRoutes = Router();

purchaseInfoRoutes.get("/purchase-info", PurchaseInfoController.getAllPurchaseInfo);
purchaseInfoRoutes.get("/purchased-by-email", PurchaseInfoController.getPurchasedByEmail);
purchaseInfoRoutes.post("/purchase-info", PurchaseInfoController.addNewPurchaseInfo);

purchaseInfoRoutes.get("/purchase-info/:id", PurchaseInfoController.getPurchaseInfoByID);
purchaseInfoRoutes.patch("/purchasePaid/:id", PurchaseInfoController.updatePaymentStatus);

export default purchaseInfoRoutes;
