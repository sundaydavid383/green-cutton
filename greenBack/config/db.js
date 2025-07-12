const mongoose = require("mongoose");
const userSchema = require("../models/UserModel");
const emailOnlySchema = require("../models/EmailOnly");
const connections = {};

const connectAppDB = async () => {
  try {
    if (!process.env.MONGO_URI_APP) throw new Error("App DB URI not set");

    const conn = await mongoose.createConnection(process.env.MONGO_URI_APP).asPromise();
    connections.app = conn;

    // Register User model on App DB connection
    conn.model("User", userSchema);
     conn.model("EmailOnly", emailOnlySchema);

    console.log("✅ Connected to App Database (users, orders, etc)");
  } catch (err) {
    console.error("❌ Failed to connect to App Database:", err.message);
    process.exit(1); // Optional: stop the app if critical DB fails
  }
};

const connectCustomizerDB = async () => {
  try {
    if (!process.env.MONGO_URI_CUSTOMIZER) throw new Error("Customizer DB URI not set");

    const conn = await mongoose.createConnection(process.env.MONGO_URI_CUSTOMIZER).asPromise();
    connections.customizer = conn;

    console.log("✅ Connected to Customizer Database");
  } catch (err) {
    console.error("❌ Failed to connect to Customizer Database:", err.message);
    process.exit(1); // Optional: stop the app if critical DB fails
  }
};

const connectAllDBs = async () => {
  await connectAppDB();
  await connectCustomizerDB();
};

module.exports = { connectAllDBs, connections };




