import mongoose from "mongoose";

let MONGO_CONNECTION_URI: string;

if (process.env.NODE_ENV === "production") {
  MONGO_CONNECTION_URI = `${process.env.MONGO_ATLAS_URI}`;
} else {
  MONGO_CONNECTION_URI = `${process.env.MONGO_ATLAS_URI_DEVELOPMENT}`;
}

// const uri = `${process.env.MONGO_ATLAS_URI}`;

const initialMongoConnection = async () => {
  mongoose.set("strictQuery", false);
  return new Promise((resolve, reject) => {
    resolve(mongoose.connect(MONGO_CONNECTION_URI));
  });
};

export default initialMongoConnection;
