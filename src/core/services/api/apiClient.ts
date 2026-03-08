import axios from "axios";
import { SecureStorage } from "../../utils/secureStorage";

declare module 'axios' {
    export interface AxiosRequestConfig {
        skipAuth?: boolean;
    }
}

const apiClient = axios.create({
    baseURL: 'http://10.0.2.2:3000',
    timeout: 10000
});

apiClient.interceptors.request.use(
    async (config) => {
        if (config.skipAuth) {
            return config;
        }

        try {
            const accessToken = await SecureStorage.getAccessToken();

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch (error) {
            console.warn('Error retrieving access token:', error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;