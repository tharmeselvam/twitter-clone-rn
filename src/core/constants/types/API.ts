export interface ApiTweet {
    id: number;
    user: ApiUser;
    content: string;
    createdAt: string;
}

export interface ApiUser<TProfile extends ApiUserProfile = ApiUserProfile> {
    id: number;
    username: string;
    profile: TProfile;
}

export type ApiUserWithBio = ApiUser<ApiUserProfileWithBio>

interface ApiUserProfile {
    name: string;
}

interface ApiUserProfileWithBio extends ApiUserProfile {
    bio: string;
}

export interface ApiTweetFeedResponse {
    page: number;
    limit: number;
    total: number;
    data: ApiTweet[];
}

export interface ApiUserFeedResponse {
    page: number;
    limit: number;
    total: number;
    data: ApiUserWithBio[];
}