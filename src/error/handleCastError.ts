import httpStatus from "http-status";
import mongoose from "mongoose";

export const handleCastError = (err: mongoose.Error.CastError) => {
  const statusCode = httpStatus.NOT_FOUND;
  const message = "Invalid ID";
  let errorMessage;
  let errorDetails;

  if (err.value) {
    errorMessage = `${err.value?._id} is not a valid ID!`;
  }

  if (err) {
    errorDetails = {
      ...err,
      stringValue: err.value._id,
      value: err.value?._id,
      name: err.name,
      message: err.message,
    };
  }

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails,
  };
};
