import axios, {
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError,
	InternalAxiosRequestConfig,
} from 'axios';
import { configUrls } from './config';

const api = axios.create({
	baseURL: configUrls?.dev,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig): any => {
		const token = localStorage.getItem('token') || '';
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

// Response interceptor to handle responses
api.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => response,
	(error: AxiosError): Promise<AxiosError> => {
		// Handle errors globally
		if (error.response) {
			// Server responded with a status other than 2xx
			console.error('API error:', error.response.data);
			// You can add custom error handling here
		} else if (error.request) {
			// No response from server
			console.error('Network error:', error.request);
		} else {
			// Other errors
			console.error('Error:', error.message);
		}
		return Promise.reject(error);
	}
);

export default api;
