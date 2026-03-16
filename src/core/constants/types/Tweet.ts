export interface Tweet {
    id: number;
    author: {
        id: number;
        username: string;
        displayName: string;
        profileImageUri: string | null;
    };
    replyCount: number;
    likeCount: number;
    isLiked: boolean;
    content: string;
    createdAt: string;
}

export interface TweetFeed {
    page: number;
    limit: number;
    total: number;
    tweets: Tweet[];
}
