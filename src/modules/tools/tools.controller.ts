import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import ToolServices from "./tools.services";

const getAllTools = catchAsyncFunc(async (req, res) => {
  const result = await ToolServices.getAllToolsFromDB();
  sendResponse(res, httpStatus.OK, "Successfully All tools found", result);
});

const createTool = catchAsyncFunc(async (req, res) => {
  const result = await ToolServices.createToolIntoDB(req.body);
  sendResponse(res, httpStatus.OK, "Successfully Created tool", result);
});

const getSingleTools = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const result = await ToolServices.getSingleToolsFromDB(id);
  sendResponse(res, httpStatus.OK, "Successfully Single tool found", result);
});

const updateSingleTool = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await ToolServices.updateSingleToolIntoDB(id, data);

  sendResponse(res, httpStatus.OK, "Successfully updated tool", result);
});

const deleteTool = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const result = await ToolServices.deleteToolFromDB(id);
  sendResponse(res, httpStatus.OK, "Successfully Deleted tool", result);
});

const ToolsController = {
  getAllTools,
  getSingleTools,
  createTool,
  updateSingleTool,
  deleteTool,
};

export default ToolsController;
