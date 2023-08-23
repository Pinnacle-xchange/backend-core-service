import mongoose from "mongoose";

async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected: ${connect.connection.host}`);
  } catch (err: any) {
    console.log(`Error: ${err.message}`);
  }
}

export default connectDB;
