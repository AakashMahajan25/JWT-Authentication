import mongoose from "mongoose";
import { MONGODB_URI } from "../constants/env";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log("Could not Connect to Database", error);
  }
};

export default connectToDatabase;
