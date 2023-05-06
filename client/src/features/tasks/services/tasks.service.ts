import { api } from "@/utils/api";

export async function allTasksApi() {
  // console.log(userId);
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

export async function newTaskApi(data: {}) {
  // console.log(userId);
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
