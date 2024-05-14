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

const ToolServices = {
  getAllToolsFromDB,
  createToolIntoDB,
};
export default ToolServices;
