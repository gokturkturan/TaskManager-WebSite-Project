import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

//delete old model if exists
if (mongoose.models["User"]) {
  const userModel = mongoose.model("User");
  mongoose.deleteModel(userModel.modelName);
}

const User = mongoose.model("User", userSchema);

export default User;
