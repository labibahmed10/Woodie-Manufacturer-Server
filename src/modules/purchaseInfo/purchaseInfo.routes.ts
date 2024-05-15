import { Router } from "express";
import PurchaseInfoController from "./purchaseInfo.controller";
const purchaseInfoRoutes = Router();

purchaseInfoRoutes.get("/purchase-info", PurchaseInfoController.getAllPurchaseInfo);
purchaseInfoRoutes.get("/purchased-by-email", PurchaseInfoController.getPurchasedByEmail);
purchaseInfoRoutes.post("/purchase-info", PurchaseInfoController.addNewPurchaseInfoOfUser);

purchaseInfoRoutes.get("/purchase-info/:id", PurchaseInfoController.getPurchaseInfoByID);
purchaseInfoRoutes.patch("/purchase-paid/:id", PurchaseInfoController.updatePaymentStatus);
purchaseInfoRoutes.patch("/purchase-info/:id", PurchaseInfoController.updateProductStatus);

export default purchaseInfoRoutes;
