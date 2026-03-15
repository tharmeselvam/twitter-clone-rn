import { Result } from "../../constants/types/Result";
import { UserFeed, UserFull } from "../../constants/types/User";
import apiClient from "../api/apiClient";
import { mapUserFull, userFeedMapper } from "../mappers/userMapper";

export const usersRepository = {
    fetchOwnProfile: async (): Promise<Result<UserFull>> => {
        try {
            const response = await apiClient.get('users/me')

            if (response.status === 200) {
                return {
                    success: true,
                    data: mapUserFull(response.data)
                }
            }

            return {
                success: false,
                error: {
                    message: response.data.message
                }
            }
        } catch(error) {
            return {
                success: false,
                error: {
                    message: "An error occurred while fetching your profile."
                }
            }
        }
    },

    fetchSearchedUsers: async (query: string): Promise<Result<UserFeed>> => {
        try {
            const response = await apiClient.get(`search/users?key=${query}`)

            if (response.status === 200) {
                return {
                    success: true,
                    data: userFeedMapper(response.data)
                }
            }

            return {
                success: false,
                error: {
                    message: response.data.message
                }
            }
        } catch(error) {
            return {
                success: false,
                error: {
                    message: "An error occured while fetching search results."
                }
            }
        }
    },
}