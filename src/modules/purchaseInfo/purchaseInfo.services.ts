import { PurchaseInfoModel } from "./purchaseInfo.model";

const getAllPurchaseInfoFromDB = async () => {
  const result = await PurchaseInfoModel.find({});
  return result;
};

const getPurchaseInfoByIDFromDB = async (id: string) => {
  const result = PurchaseInfoModel.findById(id);
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

const addNewPurchaseInDB = async (data: any) => {
  const result = await PurchaseInfoModel.create(data);
  return result;
};

// admin
const updateProductStatusIntoDB = async (id: string, status: string) => {
  const result = await PurchaseInfoModel.updateOne(
    {
      _id: id,
    },
    {
      status: status,
    }
  );
  return result;
};

const cancelOrderFromPurchaseFromDB = async (id: string) => {
  const result = await PurchaseInfoModel.deleteOne({ _id: id });

  return result;
};

const PurchaseInfoServices = {
  getAllPurchaseInfoFromDB,
  getPurchasedByEmailFromDB,
  updatePaymentStatusIntoDB,
  addNewPurchaseInDB,
  getPurchaseInfoByIDFromDB,
  updateProductStatusIntoDB,
  cancelOrderFromPurchaseFromDB,
};
export default PurchaseInfoServices;
