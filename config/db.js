import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected at ${connection.port} port successfully.`);
  } catch (err) {
    console.log(`Mongoose Error : ${err.message}`);
  }
};
export default connectDB;
