// Load environment variables
require("dotenv").config();

// Connect to Database
const dbConnect = require("./config/db");
dbConnect();
