import mongoose from "mongoose";

// Database Connection
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("Not connected", error);
  }
};


export default dbConnection;