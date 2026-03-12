import { Result } from "../../constants/types/Result";
import { TweetFeed } from "../../constants/types/Tweet";
import { UserFeed } from "../../constants/types/User";
import apiClient from "../api/apiClient";
import { tweetFeedMapper } from "../mappers/tweetMapper";
import { userFeedMapper } from "../mappers/userMapper";

export const searchRepository = {
    fetchSearchedTweets: async (query: string): Promise<Result<TweetFeed>> => {
        try {
            const response = await apiClient.get(`search/tweets?key=${query}`)

            if (response.status === 200) {
                return {
                    success: true,
                    data: tweetFeedMapper(response.data)
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