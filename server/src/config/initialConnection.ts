import mongoose from "mongoose";

const MONGO_CONNECTION_URI =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_ATLAS_URI_DEVELOPMENT
    : process.env.MONGO_ATLAS_URI;

const initialMongoConnection = async () => {
  // mongoose.set("strictQuery", false);
  return new Promise((resolve, reject) => {
    resolve(mongoose.connect(String(MONGO_CONNECTION_URI)));
  });
};

export default initialMongoConnection;

