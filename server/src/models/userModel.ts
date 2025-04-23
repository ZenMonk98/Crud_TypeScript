import mongoose, { Document, Schema, Model } from "mongoose";

interface UserType extends Document {
  name: string;
  email: string;
  age: number;
  role: string;
}

const userSchema: Schema<UserType> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  
});

const User: Model<UserType> = mongoose.model("User", userSchema);

export default User;
