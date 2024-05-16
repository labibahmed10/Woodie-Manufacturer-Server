import httpStatus from "http-status";
import { mongo } from "mongoose";

export const handleDuplicationError = (err: mongo.MongoServerError) => {
  const statusCode = httpStatus.NOT_FOUND;
  const message = "Duplicate key error";
  let errorMessage;
  let errorDetails;

  const regex = /{ (\w+): "([^"]+)" }/;
  const match = err.message.match(regex);

  if (match) {
    errorMessage = `Value '${match[2]}' is duplicate`;
    errorDetails = {
      stringValue: match[2],
      valueType: typeof match[2],
      path: match[1],
      value: match[0],
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
