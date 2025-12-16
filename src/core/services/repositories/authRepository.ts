import { Result } from "../../constants/types/Result";
import apiClient from "../api/apiClient"
import { SecureStorage } from "../secureStorage/SecureStorage";

export const authRepository = {
    login: async (
        { email, password }: { email: string, password: string }
    ): Promise<Result<void>> => {
        try {
            const response = await apiClient.post(
                '/auth/log-in',
                { email, password }
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
            console.log(error.message);
            return { success: false, error: {
                message: error.response.data.message
            }}
        }
    }
};