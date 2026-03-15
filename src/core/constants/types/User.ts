export interface User {
    id: number;
    username: string;
    profile: UserProfile;
}

export interface UserFeed {
    page: number;
    limit: number;
    total: number;
    users: User[];
}

export interface UserFull extends User {
    profile: UserProfileFull;
    followerCount: number;
    followingCount: number;
}

interface UserProfile {
    name: string;
    bio: string | null;
    profileImageUri: string | null;
}

interface UserProfileFull extends UserProfile {
    headerImageUri: string | null;
}