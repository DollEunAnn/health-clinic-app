// middleware/error.js

module.exports = {
  UNAUTHORIZED: {
    status: 401,
    message: "Unauthorized: You must be logged in to access this resource."
  },
  BAD_REQUEST: {
    status: 400,
    message: "Bad Request: Please check your input and try again."
  },
  NOT_FOUND: {
    status: 404,
    message: "Resource not found."
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error: An unexpected error occurred."
  }
};