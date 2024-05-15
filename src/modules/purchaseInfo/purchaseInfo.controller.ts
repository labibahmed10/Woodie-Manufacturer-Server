import catchAsyncFunc from "../../utils/catchAsyncFunc";
import PurchaseInfoServices from "./purchaseInfo.services";

const getAllPurchaseInfo = catchAsyncFunc(async (req, res) => {
  const result = await PurchaseInfoServices.getAllPurchaseInfoFromDB();

  return res.status(200).json({
    result,
  });
});

const getPurchaseInfoByID = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const result = await PurchaseInfoServices.getPurchaseInfoByIDFromDB(id);

  return res.status(200).json({
    result,
  });
});

const getPurchasedByEmail = catchAsyncFunc(async (req, res) => {
  const { email } = req.query;

  const result = await PurchaseInfoServices.getPurchasedByEmailFromDB(email as any);

  return res.status(200).json({
    result,
  });
});

const addNewPurchaseInfoOfUser = catchAsyncFunc(async (req, res) => {
  const data = req.body;
  const result = await PurchaseInfoServices.addNewPurchaseInDB(data);

  return res.status(200).json({
    result,
  });
});

const updatePaymentStatus = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const { transictionID, paymentID, status } = req.body;

  const result = await PurchaseInfoServices.updatePaymentStatusIntoDB(id, transictionID, paymentID, status);

  return res.status(200).json({
    result,
  });
});

const updateProductStatus = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await PurchaseInfoServices.updateProductStatusIntoDB(id, status);

  return res.status(200).json({
    result,
  });
});

const PurchaseInfoController = {
  getAllPurchaseInfo,
  getPurchasedByEmail,
  updatePaymentStatus,
  addNewPurchaseInfoOfUser,
  getPurchaseInfoByID,
  updateProductStatus,
};

export default PurchaseInfoController;
