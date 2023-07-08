import { api } from "@/utils/api";
import { getCookie, setCookie } from "@/utils/cookies";

export async function register(formValue: object) {
  try {
    const { data } = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + "auth/register",
      formValue
    );
    return data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message);
  }
}

export async function login(formValue: object) {
  try {
    const response = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + "auth/login",
      formValue
    );
    setCookie("ac-token", response.data.token);
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function isLogin() {
  try {
    const response = await api.post("auth/isLogin");
    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}

export async function logout(userId: string) {
  try {
    const token = getCookie("ac-token");
    if (!token) return null;
    // if (!token) Promise.reject();
    const response = await api.post(`auth/logout/${userId}`, { token });

    return response.data;
  } catch (error: any) {
    return Promise.reject(
      error.response?.data?.message || error.message || "Server Error"
    );
  }
}
