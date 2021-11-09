const express = require("express")
const app = express()
const dotenv = require("dotenv").config({ path: "backend/config/config.env" })
const connectDB = require("./server/database/connection")
const products = require("./server/routes/product")
const auth = require("./server/routes/auth")
const errorMiddleware = require("../backend/middlewares/errors")
const cookieParser = require("cookie-parser")

app.use(cookieParser())
//handle UncaughtExceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR : ${err.stack}`)
  console.log(`Shutting down the server due to Uncaught Exceptions`)
  process.exit(1)
})

const PORT = process.env.PORT || 8080
const appEnv = process.env.NODE_ENV
app.use(express.json())

//connecting to database
connectDB()

//Import all routes
app.use("/api/v1", products)
app.use("/api/v1", auth)

//Middleware to handle errors
app.use(errorMiddleware)

const server = app.listen(PORT, () => {
  console.log(`Server Started in ${appEnv} mode in http://localhost:${PORT}.`)
})

//handle UnhandledPromiseRejectionsWarning

process.on("unhandledRejection", (err) => {
  console.log(`ERROR : ${err.message}`)
  console.log(`Shutting down the server due to Unhandled Promise Rejection`)
  server.close(() => {
    process.exit(1)
  })
})
