import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Tweet, TweetFeed } from "../../core/constants/types/Tweet";
import { homeRepository } from "../../core/services/repositories/homeRepository";

type HomeState = {
    tweets: Tweet[];
    page: number;
    limit: number;
    total: number;
    isLoading: boolean;
    errorMessage: string | null;
}

const initialState: HomeState = {
    tweets: [],
    page: 1,
    limit: 20,
    total: 0,
    isLoading: false,
    errorMessage: null
}

export const fetchHomeTweets = createAsyncThunk<TweetFeed, void, { rejectValue: string }>(
    'home/fetchHomeTweets',
    async (_, { rejectWithValue }) => {
        const result = await homeRepository.fetchHomeFeed();

        if (!result.success) {
            return rejectWithValue(result.error.message);
        }

        return result.data as TweetFeed;
    }
);

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeTweets.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(fetchHomeTweets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tweets = action.payload.tweets;
                state.page = action.payload.page;
                state.total = action.payload.total;
            })
            .addCase(fetchHomeTweets.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload as string;
            });
    }
});

export default homeSlice.reducer;