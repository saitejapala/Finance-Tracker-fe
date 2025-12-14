import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type { ApiResponse } from './types';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor (for adding auth tokens later)
// apiClient.interceptors.request.use(
//     (config) => {
//         // Add auth token if available
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Response interceptor (for handling errors globally)
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiResponse>) => {
        // Handle common errors
        if (error.response) {
            // Server responded with error
            console.error('API Error:', error.response.data?.message);
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error: No response received');
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Helper function to handle API responses
export const handleApiResponse = <T>(response: ApiResponse<T>): T => {
    if (!response.isSuccess) {
        throw new Error(response.message || 'API request failed');
    }
    return response.data as T;
};
