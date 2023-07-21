import mongoose, { Schema, Document, model, Model } from "mongoose";

export interface Change {
     field: string;
     from: any;
     to: any;
   }

   interface TaskUpdate extends Document {
     taskId: Schema.Types.ObjectId;
     changes: Change[];
     updated_by?: Schema.Types.ObjectId;
     updated_at: Date;
   }

// interface TaskUpdate extends Document {
//   taskId: Schema.Types.ObjectId;
//   changes: Array<{
//     field: string;
//     from: any;
//     to: any;
//   }>;
//   updated_by?: Schema.Types.ObjectId;
//   updated_at: Date;
// }

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
    updated_at: { type: Date, default: Date.now },
    changes: [
      {
        field: String,
        from: Schema.Types.Mixed,
        to: Schema.Types.Mixed,
      },
    ],
  },
  {
    timestamps: true, // Include timestamps field
  }
);

export const TaskUpdate: Model<TaskUpdate> = model<TaskUpdate>(
  "TaskUpdate",
  taskUpdateSchema
);
