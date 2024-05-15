import config from "../../app/config";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import AllUsersServices from "./users.services";
import jwt from "jsonwebtoken";

const getAllRandomUsers = catchAsyncFunc(async (req, res) => {
  const result = await AllUsersServices.getAllUsersFromDB();

  return res.status(200).json({
    data: result,
  });
});

const createANewAdmin = catchAsyncFunc(async (req, res) => {
  const { email } = req.query;
  const result = await AllUsersServices.createANewAdminInDB(email as any);

  return res.status(200).json({
    result,
  });
});

const updateUserInfo = catchAsyncFunc(async (req, res) => {
  const { email } = req.query;
  const data = req.body;

  const result = await AllUsersServices.updateUserInfoIntDB(email as any, data);

  const token = jwt.sign({ email }, config.accessTokenSecret as string);

  return res.status(200).json({
    result,
    accessToken: token,
  });
});

const checkIfAdmin = catchAsyncFunc(async (req, res) => {
  const { email } = req.query;
  const requestedEmail = req.user;
  console.log("requestedEmail: " + requestedEmail);
  const result = await AllUsersServices.checkIfAdminFromDB(email as any, requestedEmail as any);

  return res.status(200).json({
    result,
  });
});

const AllUsersController = {
  getAllRandomUsers,
  createANewAdmin,
  updateUserInfo,
  checkIfAdmin,
};

export default AllUsersController;
