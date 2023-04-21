import mongoose from "mongoose";

// const uri = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.p6w2ece.mongodb.net/?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.ed4xrrh.mongodb.net/?retryWrites=true&w=majority`;

const initialMongoConnection = async () => {
  mongoose.set("strictQuery", false);
  return new Promise((resolve, reject) => {
    resolve(mongoose.connect(uri));
  });
};

export default initialMongoConnection;
