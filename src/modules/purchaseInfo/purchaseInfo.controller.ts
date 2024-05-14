import catchAsyncFunc from "../../utils/catchAsyncFunc";
import PurchaseInfoServices from "./purchaseInfo.services";

const getAllPurchaseInfo = catchAsyncFunc(async (req, res) => {
  const result = await PurchaseInfoServices.getAllPurchaseInfoFromDB();

  return res.status(200).json({
    result,
  });
});

const getPurchasedByEmail = catchAsyncFunc(async (req, res) => {
  const { email } = req.query;
  console.log(email);
  const result = await PurchaseInfoServices.getPurchasedByEmailFromDB(email as any);

  return res.status(200).json({
    result,
  });
});

const updatePaymentStatus = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const { transictionID, paymentID, status } = req.body;
  console.log(id, transictionID, paymentID);
  const result = await PurchaseInfoServices.updatePaymentStatusIntoDB(id, transictionID, paymentID, status);

  return res.status(200).json({
    result,
  });
});

const PurchaseInfoController = {
  getAllPurchaseInfo,
  getPurchasedByEmail,
  updatePaymentStatus,
};

export default PurchaseInfoController;
