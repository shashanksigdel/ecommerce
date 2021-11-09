const Product = require("../server/models/Product")
const dotenv = require("dotenv").config({ path: "backend/config/config.env" })
const connectDB = require("../server/database/connection")
const products = require("../data/products.json")

connectDB()

const seedProducts = async () => {
  try {
    await Product.deleteMany()
    console.log("Products successfully deleted from database")
    await Product.insertMany(products)
    console.log("All products successfully added into database")
    process.exit()
  } catch (err) {
    console.log(err)
    process.exit()
  }
}

seedProducts()
