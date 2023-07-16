import { Schema, model } from "mongoose";

const taskCommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TaskComment = model("TaskComment", taskCommentSchema);

export default TaskComment;
