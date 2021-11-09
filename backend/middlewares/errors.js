const ErrorHandler = require("../utils/errorHandler")
const dotenv = require("dotenv").config({ path: "backend/config/config.env" })

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    })
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err }
    error.message = err.message

    //Wrong Mongoose Object ID Error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid : ${err.path}`
      error = new ErrorHandler(message, 400)
    }

    //Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((error) => error.message)
      error = new ErrorHandler(message, 400)
    }

    //Handling mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`
      error = new ErrorHandler(message, 400)
    }

    //Handling wrong JWT error
    if (err.name === "JSONWebTokenError") {
      const message = `JSON Web Token is invalid, Try Again !!!`
      error = new ErrorHandler(message, 400)
    }

    //Handling expired JWT error
    if (err.name === "TokenExpiredError") {
      const message = `JSON Web Token is Expired, Please Try Again!!!`
      error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    })
  }
}
