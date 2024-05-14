import { IPurchaseInfo } from "./purchaseInfo.interface";
import { PurchaseInfoModel } from "./purchaseInfo.model";

const getAllPurchaseInfoFromDB = async () => {
  const result = await PurchaseInfoModel.find({});
  return result;
};

const getPurchasedByEmailFromDB = async (email: string) => {
  const result = await PurchaseInfoModel.find({
    email,
  });

  return result;
};

const updatePaymentStatusIntoDB = async (id: string, transictionID: string, paymentID: string, status: string) => {
  const result = await PurchaseInfoModel.updateOne(
    { _id: id },
    {
      paid: true,
      transictionID,
      paymentID,
      status,
    }
  );
  return result;
};

const PurchaseInfoServices = {
  getAllPurchaseInfoFromDB,
  getPurchasedByEmailFromDB,
  updatePaymentStatusIntoDB,
};
export default PurchaseInfoServices;
