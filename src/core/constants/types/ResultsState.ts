import { Tweet } from "./Tweet";
import { UserFull } from "./User";

export interface State<T> {
    isLoading: boolean;
    data: T | null;
    error: string | null;
}

export interface SearchResultsState<T> extends State<T[]> {
    data: T[];
    status: 'inactive' | 'active';
}

export interface ProfileInfoState extends State<UserFull>{}

export interface TweetsFeedState extends State<Tweet[]>{
    data: Tweet[];
}