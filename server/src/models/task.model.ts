import { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    _id: false, // Disable generating an _id for each file object
    timestamps: true,
  }
);

const taskSchema = new Schema(
  {
    slug: {
      type: String,
      unique: false,
    },
    title: {
      type: String,
      require: [true, "Field title is requierd!"],
    },
    type: {
      type: String,
      enum: ["private", "public"],
      require: [true, "Field type is requierd!"],
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
    attachments: {
      type: [fileSchema],
      default: [],
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

export default Task;
