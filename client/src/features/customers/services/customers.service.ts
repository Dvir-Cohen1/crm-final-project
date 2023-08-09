import { api } from "@/utils/api";

export async function getAllCustomersApi() {
  try {
    const { data } = await api.get(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + "customers"
    );
    return data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message);
  }
}
