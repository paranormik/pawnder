import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

// Define types for our API response
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

// Define a type for error responses
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

// Create a custom axios instance with default config
const createApiClient = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000, // 10 seconds
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // You can add authentication tokens here if needed
      // const token = getTokenFromStorage();
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const errorResponse: ApiError = {
        message: error.message,
      };

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorResponse.status = error.response.status;
        errorResponse.data = error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        errorResponse.message = "No response received from server";
      }

      return Promise.reject(errorResponse);
    }
  );

  return instance;
};

// Base API URL - you might want to move this to an environment variable
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://api.thecatapi.com"; // Replace with your API base URL

// Create the API client instance
export const apiClient = createApiClient(API_BASE_URL);

// Helper functions for common HTTP methods
export const apiRequest = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    console.log("apiRequest.get", url, config);
    const response = await apiClient.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  },

  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await apiClient.post<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  },

  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await apiClient.put<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await apiClient.delete<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  },
};
