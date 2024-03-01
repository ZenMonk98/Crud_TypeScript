import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

interface AuthType extends Document {
  name: string;
  username: string;
  password: string;
  generateHash: (password: string) => any;
  validatePassword: (password: string) => boolean;
}

const authSchema: Schema<AuthType> = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hashing Password
authSchema.methods.generateHash = async function (password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

// Validating Password
authSchema.methods.validatePassword = async function (password: string) {
  try {
    const validatedPassword = await bcrypt.compare(password, this.password);
    return validatedPassword;
  } catch (error) {
    throw error;
  }
};

const Auth: Model<AuthType> = mongoose.model("Auth", authSchema);

export default Auth;
