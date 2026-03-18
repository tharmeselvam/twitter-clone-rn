import { Result } from "../../constants/types/Result";
import { TweetFeed, TweetLike } from "../../constants/types/Tweet";
import apiClient from "../api/apiClient";
import { tweetFeedMapper } from "../mappers/tweetMapper";

export const tweetsRepository = {
    fetchHomeFeed: async (): Promise<Result<TweetFeed>> => {
        try {
            const response = await apiClient.get('/tweets/following');

            if (response.status === 200) {
                return { 
                    success: true, 
                    data: tweetFeedMapper(response.data) 
                };
            }

            return {
                success: false,
                error: {
                    message: response.data.message
                }
             };
        } catch (error) {
            return {
                success: false,
                error: {
                    message: "An error occurred while fetching the home feed."
                }
            };
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
    },

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

    createTweet: async (tweetContent: string): Promise<Result<void>> => {
        try {
            const response = await apiClient.post('tweets/create', {
                content: tweetContent
            })

            if (response.status === 201) {
                return {
                    success: true
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
                    message: "Failed to send tweet."
                }
            }
        }
    },

    toggleTweetLike: async (tweetId: number): Promise<Result<TweetLike>> => {
        try {
            const response = await apiClient.post(`tweets/${tweetId}/like`)

            if (response.status === 201) {
                return {
                    success: true,
                    data: response.data
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
                    message: "Something went wrong."
                }
            }
        }
    }
};
