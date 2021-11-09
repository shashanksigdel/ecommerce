const mongoose = require("mongoose")
const connectDB = async () => {
  try {
    //mongodb conenction string
    const con = await mongoose.connect(process.env.LOCAL_DB_URI)
    console.log(`Database connected ${con.connection.host}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB
