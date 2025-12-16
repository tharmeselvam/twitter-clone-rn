import { Result } from "../../constants/types/Result";
import apiClient from "../api/apiClient"

export const authRepository = {
    login: async (
        { email, password }: { email: string, password: string }
    ): Promise<Result<void>> => {
        try {
            const response = await apiClient.post(
                '/auth/log-in',
                { email, password }
            );

            const { accessToken, refreshToken } = response.data;
            return { success: true };
        } catch (error: any) {
            console.log(error);
            return { success: false, error: {
                message: error
            }}
        }
    }
};