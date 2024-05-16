import { IAllTools } from "./tools.interface";
import { ToolsModel } from "./tools.model";

const getAllToolsFromDB = async () => {
  const result = await ToolsModel.find({});
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

const updateSingleToolIntoDB = async (id: string, data: IAllTools) => {
  console.log("Updating ID", id);
  console.log("Updated data", data);
  console.log("Updated data", typeof data);
  let dataToUpdate = typeof data === "number" || "string";
  const result = await ToolsModel.updateOne({ _id: id }, dataToUpdate === true ? { avlQuan: data } : data, {
    runValidators: true,
  });
  return result;
};

const deleteToolFromDB = async (id: string) => {
  const result = await ToolsModel.deleteOne({ _id: id });
  return result;
};

const ToolServices = {
  getAllToolsFromDB,
  createToolIntoDB,
  getSingleToolsFromDB,
  updateSingleToolIntoDB,
  deleteToolFromDB,
};
export default ToolServices;
