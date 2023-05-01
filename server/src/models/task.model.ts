import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    slug: {
      type: String,
      unique: false,
    },
    title: {
      type: String,
      unique: false,
    },
    description: {
      type: String,
      unique: false,
    },
    due_date: {
      type: String,
      unique: false,
    },
    priority: {
      type: String,
      ref: "Priority",
      unique: false,
    },
    assignee: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      unique: false,
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      unique: false,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

export default Task;
