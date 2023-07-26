import axios, { AxiosInstance } from "axios";
import { getCookie } from "./cookies";

// create an axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT,
  timeout: 5000, // 5 seconds timeout
});

api.interceptors.request.use((config) => {
  // Check if the request already has a Content-Type header set
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }

  // Attach token to headers
  const token = getCookie("ac-token");
  if (token) {
    config.headers["ac-token"] = token;
  }
  return config;
});

// define types for API response data and error message
interface ApiResponse<T> {
  data: T;
}

interface ApiError {
  message: string;
}

// define a helper function to handle response data
function handleApiResponse<T>(response: ApiResponse<T>) {
  return response.data;
}

// define a helper function to handle error message
function handleApiError(error: ApiError) {
  console.error(error.message);
}

export { api, handleApiResponse, handleApiError };
