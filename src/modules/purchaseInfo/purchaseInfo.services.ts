import { IPurchaseInfo } from "./purchaseInfo.interface";
import { PurchaseInfoModel } from "./purchaseInfo.model";

const getAllPurchaseInfoFromDB = async () => {
  const result = await PurchaseInfoModel.find({});
  return result;
};

const PurchaseInfoServices = {
  getAllPurchaseInfoFromDB,
};
export default PurchaseInfoServices;
