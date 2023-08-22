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
export async function getCustomerApi(customerId: string) {
  try {
    const { data } = await api.get(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `customers/${customerId}`
    );
    return data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message);
  }
}

export async function searchCustomersApi(searchKeyWords: string) {
  try {
    const { data } = await api.get(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT +
        `customers/search?q=${searchKeyWords}`
    );
    return data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message);
  }
}

export async function createCustomerApi(customerData: {}) {
  try {
    const { data } = await api.post(
      process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT + `customers`,
      customerData
    );
    return data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message);
  }
}
