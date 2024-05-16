import httpStatus from "http-status";
import config from "../../app/config";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import AllUsersServices from "./users.services";
import jwt from "jsonwebtoken";

const getAllRandomUsers = catchAsyncFunc(async (req, res) => {
  const result = await AllUsersServices.getAllUsersFromDB();

  sendResponse(res, httpStatus.OK, "Successfully retrieved all users", result);
});

const createANewAdmin = catchAsyncFunc(async (req, res) => {
  const { email } = req.query;
  const result = await AllUsersServices.createANewAdminInDB(email as any);

  sendResponse(res, httpStatus.OK, "Successfully created admin", result);
});

// while login this route hits
const updateUserInfo = catchAsyncFunc(async (req, res) => {
  const { email } = req.query;
  const data = req.body;

  const userInfo = await AllUsersServices.updateUserInfoIntDB(email as any, data);
  const token = jwt.sign({ email }, config.accessTokenSecret as string);

  const result = {
    result: userInfo,
    accessToken: token,
  };

  sendResponse(res, httpStatus.OK, "Successfully updated user info", result);
});

const checkIfAdmin = catchAsyncFunc(async (req, res) => {
  const { email } = req.query;
  const requestedEmail = req.user;
  const result = await AllUsersServices.checkIfAdminFromDB(email as any, requestedEmail as any);

  sendResponse(res, httpStatus.OK, "Successfully found", result);
});

const AllUsersController = {
  getAllRandomUsers,
  createANewAdmin,
  updateUserInfo,
  checkIfAdmin,
};

export default AllUsersController;
