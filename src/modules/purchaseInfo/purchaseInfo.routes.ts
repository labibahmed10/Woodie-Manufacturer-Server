import { Router } from "express";
import PurchaseInfoController from "./purchaseInfo.controller";
import authMiddleware, { role } from "../../middlewares/authMiddleware";
const purchaseInfoRoutes = Router();

purchaseInfoRoutes.get("/purchase-info", authMiddleware(role.admin), PurchaseInfoController.getAllPurchaseInfo);

purchaseInfoRoutes.get("/purchase-by-email", PurchaseInfoController.getPurchasedByEmail);

purchaseInfoRoutes.post("/purchase-info", PurchaseInfoController.addNewPurchaseInfoOfUser);
purchaseInfoRoutes.post("/create-payment-intent", PurchaseInfoController.stripePaymentGateway);

purchaseInfoRoutes.get("/purchase-info/:id", PurchaseInfoController.getPurchaseInfoByID);

purchaseInfoRoutes.patch("/purchase-paid/:id", PurchaseInfoController.updatePaymentStatus);
purchaseInfoRoutes.patch("/purchase-info/:id", authMiddleware(role.admin), PurchaseInfoController.updateProductStatus);

purchaseInfoRoutes.delete("/cancel-order/:id", PurchaseInfoController.cancelAOrderFromPurchase);

export default purchaseInfoRoutes;
