import mongoose from "mongoose";
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error.message);
  }
};

export default connectToDB;
