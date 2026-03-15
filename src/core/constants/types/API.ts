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

export interface ApiUserFull extends ApiUser<ApiUserProfileFull> {
    followerCount: number;
    followingCount: number;
}

interface ApiUserProfile {
    name: string;
    profileImageUri: string | null;
}

interface ApiUserProfileWithBio extends ApiUserProfile {
    bio: string | null;
}

interface ApiUserProfileFull extends ApiUserProfileWithBio {
    headerImageUri: string | null;
}