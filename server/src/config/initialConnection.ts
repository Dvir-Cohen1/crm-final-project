import mongoose from "mongoose";

const uri = `${process.env.MONGO_ATLAS_URI}`;

const initialMongoConnection = async () => {
  mongoose.set("strictQuery", false);
  return new Promise((resolve, reject) => {
    resolve(mongoose.connect(uri));
  });

};

export default initialMongoConnection;
