import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchRepository } from "../../core/services/repositories/searchRepository";
import { Tweet, TweetFeed } from "../../core/constants/types/Tweet";

type SearchState = {
    query: string;
    isLoading: boolean;
    tweets: Tweet[];
    error: string | null;
}

const initialState: SearchState = {
    query: '',
    isLoading: false,
    tweets: [],
    error: null
}

export const fetchSearchedTweets = createAsyncThunk<TweetFeed, string, {rejectValue: string}>(
    'search/fetchSearchedTweets',
    async (query, { rejectWithValue }) => {
        const result = await searchRepository.fetchSearchedTweets(query)

        if (!result.success){
            return rejectWithValue(result.error.message)
        }

        return result.data as TweetFeed
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action) => {state.query = action.payload},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchedTweets.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchSearchedTweets.fulfilled, (state, action) => {
                state.isLoading = false
                state.tweets = action.payload.tweets
                state.error = null
            })
            .addCase(fetchSearchedTweets.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    }
})

export const { setQuery } = searchSlice.actions
export default searchSlice.reducer