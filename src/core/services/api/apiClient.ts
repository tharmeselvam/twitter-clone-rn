import axios, { AxiosRequestConfig } from "axios";
import { SecureStorage } from "../../utils/secureStorage";
import { isTokenValid } from "../../utils/auth";

declare module 'axios' {
    export interface AxiosRequestConfig {
        skipAuth?: boolean;
        _retry?: boolean;
    }
}

let isRefreshing = false
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}[] = []

const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error)
        else resolve(token!)
    })
    failedQueue = []
}

const refreshTokens = async (): Promise<string> => {
    try {
        const refreshToken = await SecureStorage.getRefreshToken()
        if (!refreshToken) throw new Error("Refresh token not found")

        const response = await axios.post('http://10.0.2.2:3000/auth/tokens', {
            refreshToken: refreshToken
        })

        if (response.status === 201) {
            const { accessToken, refreshToken: newRefreshToken } = response.data
            await SecureStorage.saveTokens({ accessToken, refreshToken: newRefreshToken })

            return accessToken
        } else {
            throw new Error("Failed to refresh tokens")
        }
    } catch (error) {
        throw new Error("Failed to refresh tokens")
    }
}

const apiClient = axios.create({
    baseURL: 'http://10.0.2.2:3000',
    timeout: 10000
})

apiClient.interceptors.request.use(
    async (config) => {
        if (config.skipAuth) {
            return config;
        }

        try {
            let accessToken = await SecureStorage.getAccessToken();

            if (!accessToken) return config

            if (!isTokenValid(accessToken)) {
                accessToken = await refreshTokens()
            }

            config.headers.Authorization = `Bearer ${accessToken}`
        } catch (error) {
            console.warn('Error retrieving access token:', error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig

        const is401 = error.response?.status === 401
        const alreadyRetried = originalRequest._retry
        const isRefreshEndpoint = originalRequest.url?.includes('auth/tokens')

        if (!is401 || alreadyRetried || isRefreshEndpoint) {
            return Promise.reject(error)
        }

        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject })
            })
                .then((token) => {
                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${token}`,
                    }

                    return apiClient(originalRequest)
                })
                .catch((error) => Promise.reject(error))
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
            const newAccessToken = await refreshTokens()
            processQueue(null, newAccessToken)

            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${newAccessToken}`,
            }

            return apiClient(originalRequest)
        } catch (refreshError) {
            processQueue(refreshError, null)
            // Handle sign out here
            return Promise.reject(refreshError)
        } finally {
            isRefreshing = false
        }
    }
)

export default apiClient;