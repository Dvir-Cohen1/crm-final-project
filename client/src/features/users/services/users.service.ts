import { api } from "@/utils/api";

export async function getUser(userId: string) {
  // console.log(userId);
  try {
    const response = await api.get(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `users/${userId}`
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function getAllUsers() {
  try {
    const response = await api.get(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `users`
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function addNewUser(data: {}) {
  try {
    const response = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `users/add`,
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function deleteUserById(userId: string) {
  try {
    const response = await api.delete(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `users/${userId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
