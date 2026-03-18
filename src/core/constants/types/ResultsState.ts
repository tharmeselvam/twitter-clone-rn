import { UserFull } from "./User";

export interface State {
    isLoading: boolean;
    error: string | null;
}

export interface SearchResultsState extends State {
    ids: number[];
    status: 'inactive' | 'active';
}

export interface ProfileInfoState extends State {
    data: UserFull | null;
}

export interface TweetsFeedState extends State {
    tweetIds: number[];
}