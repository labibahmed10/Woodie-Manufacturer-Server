import { IAllTools } from "./tools.interface";
import { ToolsModel } from "./tools.model";

const getAllToolsFromDB = async () => {
  const result = await ToolsModel.find({});
  console.log(result);
  return result;
};

const createToolIntoDB = async (data: IAllTools) => {
  const result = await ToolsModel.create(data);
  return result;
};

const getSingleToolsFromDB = async (id: string) => {
  const result = await ToolsModel.findById(id);
  return result;
};

const ToolServices = {
  getAllToolsFromDB,
  createToolIntoDB,
  getSingleToolsFromDB,
};
export default ToolServices;
