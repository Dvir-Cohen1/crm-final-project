import { api } from "@/utils/api";

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

export async function editTaskApi(data:any) {
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
export async function deleteTaskApi(userId: string) {
  try {
    const response = await api.delete(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `tasks/${userId}`
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

// Tasks statuses
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
