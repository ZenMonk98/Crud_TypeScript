import mongoose from "mongoose";

export const connectDb = async () => {
  mongoose
    .connect(String(process.env.MONGO_URI), { dbName: "Yano" })
    .then(() => console.log("DB Connected."));
};
