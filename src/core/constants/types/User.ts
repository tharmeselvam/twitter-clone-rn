export interface User {
    id: number;
    username: string;
    profile: {
        name: string;
        bio: string;
    }
}

export interface UserFeed {
    page: number;
    limit: number;
    total: number;
    users: User[];
}

export interface UserFull extends User {
    followerCount: number;
    followingCount: number;
}