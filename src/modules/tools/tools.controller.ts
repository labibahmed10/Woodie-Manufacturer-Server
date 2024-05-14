import catchAsyncFunc from "../../utils/catchAsyncFunc";
import ToolServices from "./tools.services";

const getAllTools = catchAsyncFunc(async (req, res) => {
  const result = await ToolServices.getAllToolsFromDB();

  return res.status(200).json({
    data: result,
  });
});

const createTool = catchAsyncFunc(async (req, res) => {
  const result = await ToolServices.createToolIntoDB(req.body);
  return res.status(200).json({
    result,
  });
});

const getSingleTools = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const result = await ToolServices.getSingleToolsFromDB(id);

  return res.status(200).json({
    data: result,
  });
});

const updateSingleTool = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await ToolServices.updateSingleToolIntoDB(id, data);

  return res.status(200).json({
    result,
  });
});

const deleteTool = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const result = await ToolServices.deleteToolFromDB(id);

  return res.status(200).json({
    result,
  });
});

const ToolsController = {
  getAllTools,
  getSingleTools,
  createTool,
  updateSingleTool,
  deleteTool,
};

export default ToolsController;
