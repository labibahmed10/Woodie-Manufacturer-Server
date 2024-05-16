import httpStatus from "http-status";

export const handleInstanceError = (error: Error) => {

  const statusCode = httpStatus.BAD_REQUEST;
  const message =
    error.message === "You do not have the necessary permissions to access this resource." ? "Unauthorized Access" : "There was an error";
  const errorMessage = error.message;

  return {
    statusCode,
    message,
    errorMessage,
  };
};
