import { Schema, model } from "mongoose";

const taskStatusesSchema = new Schema(
  {
    label: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
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

const TaskStatuses = model("TaskStatuses", taskStatusesSchema);

export default TaskStatuses;
