import { Result } from "../../constants/types/Result";
import apiClient from "../api/apiClient"
import { SecureStorage } from "../../utils/secureStorage";
import { usersRepository } from "./usersRepository";

export const authRepository = {
    checkAuthStatus: async () => {
        try {
            const response = await usersRepository.fetchOwnProfile()
            return response.success 
        } catch {
            return false
        }
    },
        
    login: async (
        { email, password }: { email: string, password: string }
    ): Promise<Result<void>> => {
        try {
            const response = await apiClient.post(
                '/auth/log-in',
                { email, password },
                { skipAuth: true }
            );

            if (response.status === 201) {
                const { accessToken, refreshToken } = response.data;
                await SecureStorage.saveTokens({ accessToken, refreshToken });

                return { success: true };
            } else {
                return { success: false, error: {
                    message: response.data.message
                }};
            }
            
        } catch (error: any) {
            return { success: false, error: {
                message: error.response.data.message
            }}
        }
    }
}
