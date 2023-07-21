import { Schema, model } from "mongoose";
import TaskComment from "./taskComments.js";
import { TaskUpdate } from "./taskUpdates.js";

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
    comments: {
      type: [TaskComment.schema], // Embed an array of task comments within the task
      default: [],
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

interface Task extends Document {
  [key: string]: any;
  taskUpdates: typeof TaskUpdate[];
}

// taskSchema.pre<Task>("save", async function (next) {

//   try {
//     // Check if the document is new (insert) or being updated
//     if (this.isNew) {
//       // If it's a new Task, no need to create TaskUpdate
//       return next();
//     }

//     // Get the original document from the database
//     const originalTask = (await Task.findById(this._id)) as Task;

//     // Get all modified fields
//     const modifiedPaths = (await this.modifiedPaths()) as (keyof Task)[];

//     // Create changes array to store all field changes
//     const changes = modifiedPaths.map((field) => ({
//       field: field as string,
//       from: originalTask[field],
//       to: this[field],
//     }));

//     // Create a TaskUpdate if there are changes
//     if (changes.length > 0) {
//       const userId = (this as any).constructor.userId || null;
//       await TaskUpdate.create({
//         taskId: this._id,
//         userId,
//         changes: changes,
//       });
//     }

//     next();
//   } catch (err: any) {
//     console.error("Error:", err);
//     next(err);
//   }
// });

const Task = model("Task", taskSchema);

export default Task;
