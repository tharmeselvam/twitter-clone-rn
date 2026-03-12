import { Result } from "../../constants/types/Result";
import { TweetFeed } from "../../constants/types/Tweet";
import apiClient from "../api/apiClient";
import { tweetFeedMapper } from "../mappers/tweetMapper";

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
    }
}