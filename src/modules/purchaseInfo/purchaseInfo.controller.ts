import Stripe from "stripe";
import config from "../../app/config";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import PurchaseInfoServices from "./purchaseInfo.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const stripe: Stripe = require("stripe")(config.stripeKey);

const getAllPurchaseInfo = catchAsyncFunc(async (req, res) => {
  const result = await PurchaseInfoServices.getAllPurchaseInfoFromDB();

  sendResponse(res, httpStatus.OK, "Successfully retrieved all purchase info", result);
});

const getPurchaseInfoByID = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const result = await PurchaseInfoServices.getPurchaseInfoByIDFromDB(id);
  sendResponse(res, httpStatus.OK, "Successfully got purchase info", result);
});

const getPurchasedByEmail = catchAsyncFunc(async (req, res) => {
  const { email } = req.query;
  const result = await PurchaseInfoServices.getPurchasedByEmailFromDB(email as any);

  sendResponse(res, httpStatus.OK, "Successfully found by email", result);
});

const addNewPurchaseInfoOfUser = catchAsyncFunc(async (req, res) => {
  const data = req.body;
  const result = await PurchaseInfoServices.addNewPurchaseInDB(data);

  sendResponse(res, httpStatus.OK, "Successfully added new purchase info", result);
});

const updatePaymentStatus = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const { transictionID, paymentID, status } = req.body;
  const result = await PurchaseInfoServices.updatePaymentStatusIntoDB(id, transictionID, paymentID, status);

  sendResponse(res, httpStatus.OK, "Successfully updated payment status", result);
});

const updateProductStatus = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await PurchaseInfoServices.updateProductStatusIntoDB(id, status);

  sendResponse(res, httpStatus.OK, "Successfully updated product status", result);
});

const cancelAOrderFromPurchase = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  
  const result = await PurchaseInfoServices.cancelOrderFromPurchaseFromDB(id);

  sendResponse(res, httpStatus.OK, "Successfully cancel the order", result);
});

const stripePaymentGateway = catchAsyncFunc(async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  if (amount) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    sendResponse(res, httpStatus.OK, "Payment intent success", {
      clientSecret: paymentIntent.client_secret,
    });
  }
});

const PurchaseInfoController = {
  getAllPurchaseInfo,
  getPurchasedByEmail,
  updatePaymentStatus,
  addNewPurchaseInfoOfUser,
  getPurchaseInfoByID,
  updateProductStatus,
  cancelAOrderFromPurchase,
  stripePaymentGateway,
};

export default PurchaseInfoController;
