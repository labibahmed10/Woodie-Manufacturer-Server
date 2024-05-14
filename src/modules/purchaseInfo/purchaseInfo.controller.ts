import catchAsyncFunc from "../../utils/catchAsyncFunc";
import PurchaseInfoServices from "./purchaseInfo.services";

const getAllPurchaseInfo = catchAsyncFunc(async (req, res) => {
  const result = await PurchaseInfoServices.getAllPurchaseInfoFromDB();

  return res.status(200).json({
    data: result,
  });
});

const PurchaseInfoController = {
  getAllPurchaseInfo,
};

export default PurchaseInfoController;
