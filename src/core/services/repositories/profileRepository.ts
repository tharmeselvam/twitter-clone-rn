import { Result } from "../../constants/types/Result";
import { TweetFeed } from "../../constants/types/Tweet";
import { UserFull } from "../../constants/types/User";
import apiClient from "../api/apiClient";
import { tweetFeedMapper } from "../mappers/tweetMapper";
import { mapUserFull } from "../mappers/userMapper";

export const profileRepository = {
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

    fetchOwnTweets: async (withReplies: boolean): Promise<Result<TweetFeed>> => {
        try {
            const response = await apiClient.get(`tweets/me?replies=${withReplies}`)

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
                    message: "An error occurred while fetching tweets."
                }
            }
        }
    },

    fetchLikedTweets: async (): Promise<Result<TweetFeed>> => {
        try {
            const response = await apiClient.get('tweets/liked')

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
                    message: "An error occurred while fetching tweets."
                }
            }
        }
    }
}