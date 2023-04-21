import { api } from "@/utils/api";

export async function register(formValue: object) {
  try {
    const {data} = await api.post(
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
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message);
  }
}
