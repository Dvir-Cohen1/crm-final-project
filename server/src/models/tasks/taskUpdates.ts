import { Schema, Document, model, Model } from "mongoose";
interface TaskUpdate extends Document {
  taskId: Schema.Types.ObjectId;
  changes: {};
  fieldName: string;
  fromValue: string;
  toValue: string;
  updated_by?: Schema.Types.ObjectId;
  updated_at: Date;
}

const taskUpdateSchema = new Schema<TaskUpdate>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "taskId field is required"],
    },
    updated_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "updated_by field is required"],
    }, // Include userId (updated_by) field with reference to User model
    fieldName: {
      type: String,
      required: [true, "fieldName field is required"],
    },
    fromValue: {
      type: Schema.Types.Mixed,
      required: [true, "fromValue field is required"],
    },
    toValue: {
      type: Schema.Types.Mixed,
      required: [true, "toValue field is required"],
    },
  },
  {
    timestamps: true, // Include timestamps field
  }
);

export const TaskUpdate: Model<TaskUpdate> = model<TaskUpdate>(
  "TaskUpdate",
  taskUpdateSchema
);
