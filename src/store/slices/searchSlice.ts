import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Tweet, TweetFeed } from "../../core/constants/types/Tweet";
import { User, UserFeed } from "../../core/constants/types/User";
import { SearchResultsState } from "../../core/constants/types/ResultsState";
import { tweetsRepository } from "../../core/services/repositories/tweetsRepository";
import { usersRepository } from "../../core/services/repositories/usersRepository";

type SearchState = {
    hasSearched: boolean;
    query: string;
    tweetsResult: SearchResultsState<Tweet>;
    usersResult: SearchResultsState<User>;
}

const initialTweetsState: SearchResultsState<Tweet> = {
    isLoading: false,
    data: [],
    status: 'inactive',
    error: null,
}

const initialUsersState: SearchResultsState<User> = {
    isLoading: false,
    data: [],
    status: 'inactive',
    error: null,
}

const initialState: SearchState = {
    hasSearched: false,
    query: '',
    tweetsResult: initialTweetsState,
    usersResult: initialUsersState
}

export const fetchSearchedTweets = createAsyncThunk<TweetFeed, string, {rejectValue: string}>(
    'search/fetchSearchedTweets',
    async (query, { rejectWithValue }) => {
        const result = await tweetsRepository.fetchSearchedTweets(query)

        if (!result.success){
            return rejectWithValue(result.error.message)
        }

        return result.data as TweetFeed
    }
)

export const fetchSearchedUsers = createAsyncThunk<UserFeed, string, {rejectValue: string}>(
    'search/fetchSearchedUsers',
    async (query, { rejectWithValue }) => {
        const result = await usersRepository.fetchSearchedUsers(query)

        if (!result.success){
            return rejectWithValue(result.error.message)
        }

        return result.data as UserFeed
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action) => {state.query = action.payload},
        resetSearch: (state) => {
            state.tweetsResult = initialTweetsState
            state.usersResult = initialUsersState
        },
        clearSearch: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch searched tweets
            .addCase(fetchSearchedTweets.pending, (state) => {
                state.hasSearched = true
                state.tweetsResult.isLoading = true
                state.tweetsResult.status = 'active'
                state.tweetsResult.error = null
            })
            .addCase(fetchSearchedTweets.fulfilled, (state, action) => {
                state.hasSearched = true
                state.tweetsResult.isLoading = false
                state.tweetsResult.data = action.payload.tweets
                state.tweetsResult.status = 'active'
                state.tweetsResult.error= null
            })
            .addCase(fetchSearchedTweets.rejected, (state, action) => {
                state.hasSearched = true
                state.tweetsResult.isLoading = false
                state.tweetsResult.status = 'active'
                state.tweetsResult.error = action.payload as string
            })

            // Fetch searched users
            .addCase(fetchSearchedUsers.pending, (state) => {
                state.hasSearched = true
                state.usersResult.isLoading = true
                state.usersResult.status = 'active'
                state.usersResult.error = null
            })
            .addCase(fetchSearchedUsers.fulfilled, (state, action) => {
                state.hasSearched = true
                state.usersResult.isLoading = false
                state.usersResult.data = action.payload.users
                state.usersResult.status = 'active'
                state.usersResult.error = null
            })
            .addCase(fetchSearchedUsers.rejected, (state, action) => {
                state.hasSearched = true
                state.usersResult.isLoading = false
                state.usersResult.status = 'active'
                state.usersResult.error = action.payload as string
            })
    }
})

export const { setQuery, resetSearch, clearSearch } = searchSlice.actions
export default searchSlice.reducer