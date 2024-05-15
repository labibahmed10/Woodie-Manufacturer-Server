import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { role } from "../../middlewares/authMiddleware";
import { IAllUsers } from "./users.interface";
import { AllUsersModel } from "./users.model";

const getAllUsersFromDB = async (): Promise<IAllUsers[]> => {
  const result = await AllUsersModel.find({});
  return result;
};

const createANewAdminInDB = async (email: string) => {
  const result = await AllUsersModel.updateOne(
    {
      email: email,
    },
    {
      role: "admin",
    }
  );

  return result;
};

const updateUserInfoIntDB = async (email: string, data: Partial<IAllUsers>) => {
  console.log(email);
  console.log(data);
  const result = await AllUsersModel.updateOne(
    {
      email: email,
    },
    data,
    {
      upsert: true,
    }
  );

  return result;
};

const checkIfAdminFromDB = async (email: string, reqEmail: string) => {
  console.log("email admin", email);
  console.log("req amdin", reqEmail);
  if (email === reqEmail) {
    const adminAccount = await AllUsersModel.findOne({ email });
    console.log("adminAccount", adminAccount);
    const isAdmin = adminAccount!.role === role.admin;
    console.log(isAdmin);
    return isAdmin;
  } else {
    throw new AppError(httpStatus.FORBIDDEN, "User is not a admin");
  }
};

const AllUsersServices = {
  getAllUsersFromDB,
  createANewAdminInDB,
  updateUserInfoIntDB,
  checkIfAdminFromDB,
};
export default AllUsersServices;
