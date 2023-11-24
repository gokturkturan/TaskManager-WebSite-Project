import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    category: { type: String, required: true },
    dateToStart: { type: String, required: true },
    dateToFinish: { type: String, required: true },
    reference: { type: String, required: true },
    priority: { type: String, required: true },
  },
  { timestamps: true }
);

//delete old model if exists
if (mongoose.models["Task"]) {
  const taskModel = mongoose.model("Task");
  mongoose.deleteModel(taskModel.modelName);
}

const Task = mongoose.model("Task", taskSchema);

export default Task;
