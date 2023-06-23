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
export async function editTaskApi(data: any) {
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
export async function cloneTaskApi(data: any) {
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
export async function uploadTaskAttachmentsApi({ taskId, attachments }: any) {
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

export async function deleteAllTaskAttachmentsApi({ taskId }: any) {
  try {
    const response = await api.delete(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `tasks/task/uploadAttachments/${taskId}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
