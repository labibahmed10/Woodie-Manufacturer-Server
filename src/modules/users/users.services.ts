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
  const result = await AllUsersModel.updateOne(
    {
      email: email,
    },
    data,
    {
      runValidators: true,
      upsert: true,
    }
  );

  return result;
};

const AllUsersServices = {
  getAllUsersFromDB,
  createANewAdminInDB,
  updateUserInfoIntDB,
};
export default AllUsersServices;
