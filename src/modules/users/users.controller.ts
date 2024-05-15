import catchAsyncFunc from "../../utils/catchAsyncFunc";
import AllUsersServices from "./users.services";

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

  return res.status(200).json({
    result,
  });
});

const AllUsersController = {
  getAllRandomUsers,
  createANewAdmin,
  updateUserInfo,
};

export default AllUsersController;
