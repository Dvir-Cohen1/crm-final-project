import { api } from "@/utils/api";

export async function getUser(userId: string) {
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
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function uploadProfileImageApi(
  profileImage: string | undefined,
  userId: string | undefined
) {
  try {
    const response = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `users/uploadProfileImage/${userId}`,
      { profileImage },
      {
        headers: {
          "Content-Type": "multipart/form-data", // set the appropriate content type
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function deleteProfileImageApi(userId: string | undefined) {
  try {
    const response = await api.delete(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `users/deleteProfileImage/${userId}`
    );

    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function editUserApi(
  userData: Object,
  userId: string | undefined
) {
  try {
    const response = await api.put(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `users/editUser/${userId}`,
      userData
    );

    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function pinItemApi(itemId: string | undefined) {
  try {
    const response = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `users/pinItem/${itemId}`
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function removeAllPinItemsApi() {
  try {
    const response = await api.delete(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `users/pinItem/removeAll`
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
