import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL || "";
    await mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};
