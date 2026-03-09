import { ApiTweet, ApiTweetFeedResponse } from "../../constants/types/API";
import { Tweet, TweetFeed } from "../../constants/types/Tweet";
import formatUsername from "../../utils/formatUsername";

const mapTweet = (apiTweet: ApiTweet): Tweet => ({
    id: apiTweet.id,
    author: {
        id: apiTweet.user.id,
        username: formatUsername(apiTweet.user.username),
        displayName: apiTweet.user.profile.name,
    },
    content: apiTweet.content,
    createdAt: apiTweet.createdAt,
});

export const tweetFeedMapper = (response: ApiTweetFeedResponse): TweetFeed => ({
    page: response.page,
    limit: response.limit,
    total: response.total,
    tweets: response.data.map(mapTweet),
});
    