import axios, { AxiosInstance } from "axios";
import { getCookie } from "./cookies";

// create an axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_URL_ENDPOINT,
  timeout: 5000, // 5 seconds timeout
});


// Check if we are running on the client-side before adding the interceptor
if (typeof window !== 'undefined') {
  api.interceptors.request.use(async (config) => {
    // Check if the request already has a Content-Type header set
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  
    try {
      // Fetch the token asynchronously
      const token = await getCookie("ac-token");
      
      // Attach the token to headers if it exists
      if (token) {
        config.headers["ac-token"] = token;
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  
    return config;
  });
}


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
