import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchRepository } from "../../core/services/repositories/searchRepository";
import { Tweet, TweetFeed } from "../../core/constants/types/Tweet";
import { User, UserFeed } from "../../core/constants/types/User";
import { ResultsState } from "../../core/constants/types/ResultsState";

type SearchState = {
    hasSearched: boolean;
    query: string;
    tweetsResults: ResultsState<Tweet>;
    usersResults: ResultsState<User>;
}

const initialTweetsState: ResultsState<Tweet> = {
    isLoading: false,
    data: [],
    status: 'inactive',
    error: null,
}

const initialUsersState: ResultsState<User> = {
    isLoading: false,
    data: [],
    status: 'inactive',
    error: null,
}

const initialState: SearchState = {
    hasSearched: false,
    query: '',
    tweetsResults: initialTweetsState,
    usersResults: initialUsersState
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

export const fetchSearchedUsers = createAsyncThunk<UserFeed, string, {rejectValue: string}>(
    'search/fetchSearchedUsers',
    async (query, { rejectWithValue }) => {
        const result = await searchRepository.fetchSearchedUsers(query)

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
            state.tweetsResults = initialTweetsState
            state.usersResults = initialUsersState
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
                state.tweetsResults.isLoading = true
                state.tweetsResults.status = 'active'
                state.tweetsResults.error = null
            })
            .addCase(fetchSearchedTweets.fulfilled, (state, action) => {
                state.hasSearched = true
                state.tweetsResults.isLoading = false
                state.tweetsResults.data = action.payload.tweets
                state.tweetsResults.status = 'active'
                state.tweetsResults.error= null
            })
            .addCase(fetchSearchedTweets.rejected, (state, action) => {
                state.hasSearched = true
                state.tweetsResults.isLoading = false
                state.tweetsResults.status = 'active'
                state.tweetsResults.error = action.payload as string
            })

            // Fetch searched users
            .addCase(fetchSearchedUsers.pending, (state) => {
                state.hasSearched = true
                state.usersResults.isLoading = true
                state.usersResults.status = 'active'
                state.usersResults.error = null
            })
            .addCase(fetchSearchedUsers.fulfilled, (state, action) => {
                state.hasSearched = true
                state.usersResults.isLoading = false
                state.usersResults.data = action.payload.users
                state.usersResults.status = 'active'
                state.usersResults.error = null
            })
            .addCase(fetchSearchedUsers.rejected, (state, action) => {
                state.hasSearched = true
                state.usersResults.isLoading = false
                state.usersResults.status = 'active'
                state.usersResults.error = action.payload as string
            })
    }
})

export const { setQuery, resetSearch, clearSearch } = searchSlice.actions
export default searchSlice.reducer