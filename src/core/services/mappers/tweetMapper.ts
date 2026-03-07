import { ApiTweet, ApiTweetFeedResponse } from "../../constants/types/API";
import { Tweet, TweetFeed } from "../../constants/types/Tweet";

const mapTweet = (apiTweet: ApiTweet): Tweet => ({
    id: apiTweet.id,
    author: {
        id: apiTweet.user.id,
        username: apiTweet.user.username,
        displayName: apiTweet.user.profile.name,
    },
    content: apiTweet.content,
    createdAt: new Date(apiTweet.createdAt),
});

export const tweetFeedMapper = (response: ApiTweetFeedResponse): TweetFeed => ({
    page: response.page,
    limit: response.limit,
    total: response.total,
    tweets: response.data.map(mapTweet),
});
    