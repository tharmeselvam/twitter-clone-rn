export interface ApiTweet {
    id: number;
    user: ApiUser;
    content: string;
    createdAt: string;
}

interface ApiUser {
    id: number;
    username: string;
    profile: ApiUserProfile;
}

interface ApiUserProfile {
    name: string;
}

export interface ApiTweetFeedResponse {
    page: number;
    limit: number;
    total: number;
    data: ApiTweet[];
}