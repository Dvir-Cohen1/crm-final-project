import { api } from "@/utils/api";
//
// Get all Tasks API
//
export async function allTasksApi() {
  try {
    const response = await api.get(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `tasks`
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
//
// Get Task API
//
export async function getTaskApi(taskId: string) {
  try {
    const response = await api.get(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `tasks/${taskId}`
    );
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
//
// Create Task API
//
export async function newTaskApi(data: {}) {
  try {
    const response = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `tasks/`,
      data
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
//
// Edit Task API
//
export async function editTaskApi(data: { taskId: string; taskData: {} }) {
  // console.log(taskData)
  try {
    const response = await api.put(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `tasks/${data.taskId}`,
      data.taskData
    );

    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
//
// Clone Task API
//
export async function cloneTaskApi(data: {
  taskId: string;
  cloneOptions: {};
  clonedTaskTitle: boolean;
}) {
  try {
    const response = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `tasks/clone/${data.taskId}`,
      {
        cloneOptions: data.cloneOptions,
        clonedTaskTitle: data.clonedTaskTitle,
      }
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
export async function deleteTaskApi(taskId: string) {
  try {
    const response = await api.delete(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `tasks/${taskId}`
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
//
// Tasks statuses
//
export async function getTasksStatusesApi() {
  try {
    const response = await api.get(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `tasks/task/statuses`
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
//
// Upload task attachments
//
export async function uploadTaskAttachmentsApi({
  taskId,
  attachments,
}: {
  taskId: string;
  attachments: [];
}) {
  try {
    const response = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `tasks/task/uploadAttachments/${taskId}`,
      attachments,
      {
        headers: {
          "Content-Type": "multipart/form-data", // set the appropriate content type
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function deleteAllTaskAttachmentsApi({
  taskId,
}: {
  taskId: string;
}) {
  try {
    const response = await api.delete(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `tasks/task/deleteAllAttachments/${taskId}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
export async function deleteOneTaskAttachmentApi({
  taskId,
  fileName,
}: {
  taskId: string;
  fileName: string;
}) {
  try {
    const response = await api.delete(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `tasks/task/deleteOneAttachment/${taskId}/${fileName}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
export async function downloadAllAttachmentsAsZipApi(taskId: string) {
  try {
    const response = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `tasks/task/downloadAttachments/${taskId}`,
      { responseType: "blob" } // Set the response type to 'blob'
    );
    console.log(response.data);

    const blob = new Blob([response.data], { type: "application/zip" });

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element and trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = `${taskId}.zip`;
    link.click();

    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);

    return;
  } catch (error: any) {
    console.log(error);
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
//
// Add task comment
//
export async function addTaskCommentApi({
  taskId,
  content,
}: {
  taskId: string;
  content: string;
}) {
  try {
    const response = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `tasks/task/${taskId}/comments`,
      { content }
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
export async function deleteTaskCommentApi({
  taskId,
  commentId,
}: {
  taskId: string;
  commentId: string;
}) {
  try {
    const response = await api.delete(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `tasks/task/${taskId}/comments/${commentId}`
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
// // Helper function to convert a buffer to ArrayBuffer
// function toArrayBuffer(buffer: Buffer) {
//   const arrayBuffer = new ArrayBuffer(buffer.length);
//   const view = new Uint8Array(arrayBuffer);
//   for (let i = 0; i < buffer.length; ++i) {
//     view[i] = buffer[i];
//   }
//   return arrayBuffer;
// }
