import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("Something went wrong when connect to database");
    process.exit(1);
  }
};

export default connectToDB;
