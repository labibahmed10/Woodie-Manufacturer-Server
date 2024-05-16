import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import mongoose, { mongo } from "mongoose";
import { AppError } from "../error/AppError";
import { handleInstanceError } from "../error/handleInstanceError";
import { handleDuplicationError } from "../error/handleDuplicationError";
import { handleCastError } from "../error/handleCastError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = "Something went wrong";
  let errorMessage: string = "";
  let errorDetails;

  if (error instanceof mongo.MongoServerError && error.code === 11000) {
    const details = handleDuplicationError(error);
    message = details.message;
    errorMessage = details.errorMessage as string;
    statusCode = details.statusCode;
    errorDetails = details.errorDetails;
  } else 
  
  if (error instanceof mongoose.Error.CastError || error.name === "CastError") {
    const details = handleCastError(error);
    statusCode = details.statusCode;
    message = details.message;
    errorMessage = details.errorMessage as string;
    errorDetails = details.errorDetails;
  } else 
  
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = "There was an App error";
    errorMessage = error.message;
  } else 
  
  if (error instanceof Error) {
    const details = handleInstanceError(error);
    statusCode = details.statusCode;
    message = details.message;
    errorMessage = details.errorMessage;
    errorDetails = null;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage,
    errorDetails,
    stack: message === "Unauthorized Access" ? null : error.stack,
  });
};

export default globalErrorHandler;
