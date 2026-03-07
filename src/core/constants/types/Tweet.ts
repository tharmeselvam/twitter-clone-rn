export interface Tweet {
    id: number;
    author: {
        id: number;
        username: string;
        displayName: string;
    };
    content: string;
    createdAt: Date;
}

export interface TweetFeed {
    page: number;
    limit: number;
    total: number;
    tweets: Tweet[];
}
