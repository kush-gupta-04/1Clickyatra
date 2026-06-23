const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("Database Name:", conn.connection.name);
    console.log("Host:", conn.connection.host);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
