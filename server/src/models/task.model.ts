import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    slug: {
      type: String,
      unique: false,
    },
    title: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      enum: ["private", "public"],
      require: true,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "TaskStatuses",
      require: [true, "Field status is requierd!"],
    },
    description: {
      type: String,
      unique: false,
    },
    due_date: {
      type: Date,
      unique: false,
    },
    priority: {
      type: String,
      // ref: "Priority",
      unique: false,
    },
    assignee: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
      unique: false,
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
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
