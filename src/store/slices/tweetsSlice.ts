import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TweetFeed } from "../../core/constants/types/Tweet";
import { tweetsRepository } from "../../core/services/repositories/tweetsRepository";
import { TweetsFeedState } from "../../core/constants/types/ResultsState";
import { ProfileFeedType } from "../../core/constants/types/ProfileFeedType";

type TweetsState = {
    homeTweets: TweetsFeedState;
    profileTweets: TweetsFeedState;
    profileReplies: TweetsFeedState;
    profileLikes: TweetsFeedState;
}

interface FetchProfileFeedSuccess {
    feedType: ProfileFeedType;
    feedData: TweetFeed;
}

const initialTweetsFeedState: TweetsFeedState = {
    isLoading: false,
    data: [],
    error: null,
}

const initialTweetsState: TweetsState = {
    homeTweets: initialTweetsFeedState,
    profileTweets: initialTweetsFeedState,
    profileReplies: initialTweetsFeedState,
    profileLikes: initialTweetsFeedState,
}

export const fetchHomeFeed = createAsyncThunk<TweetFeed, void, { rejectValue: string }>(
    'tweets/fetchHomeFeed',
    async (_, { rejectWithValue }) => {
        const result = await tweetsRepository.fetchHomeFeed();

        if (!result.success) {
            return rejectWithValue(result.error.message);
        }

        return result.data as TweetFeed;
    }
)

export const fetchProfileFeed = createAsyncThunk<FetchProfileFeedSuccess, ProfileFeedType, { rejectValue: string }>(
    'tweets/fetchProfileFeed',
    async(feedType, { rejectWithValue }) => {

        let result
        switch (feedType) {
            case 'profileTweets':
                result = await tweetsRepository.fetchOwnTweets(false)
                break
            case 'profileReplies':
                result = await tweetsRepository.fetchOwnTweets(true)
                break
            case 'profileLikes':
                result = await tweetsRepository.fetchLikedTweets()
                break
        }

        if (!result.success) {
            return rejectWithValue(result.error.message)
        }

        return { feedType, feedData: result.data } as FetchProfileFeedSuccess
    }
)

const tweetsSlice = createSlice({
    name: 'tweets',
    initialState: initialTweetsState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Home Feed
            .addCase(fetchHomeFeed.pending, (state) => {
                state.homeTweets.isLoading = true;
                state.homeTweets.error = null;
            })
            .addCase(fetchHomeFeed.fulfilled, (state, action) => {
                state.homeTweets.isLoading = false;
                state.homeTweets.data = action.payload.tweets;
            })
            .addCase(fetchHomeFeed.rejected, (state, action) => {
                state.homeTweets.isLoading = false;
                state.homeTweets.error = action.payload as string;
            })

            // Profile Feed
            .addCase(fetchProfileFeed.pending, (state, action) => {
                const feedType = action.meta.arg
                state[feedType].isLoading = true
                state[feedType].error = null
            })
            .addCase(fetchProfileFeed.fulfilled, (state, action) => {
                const { feedType, feedData } = action.payload
                state[feedType].isLoading = false
                state[feedType].data = feedData.tweets
                state[feedType].error = null
            })
            .addCase(fetchProfileFeed.rejected, (state, action) => {
                const feedType = action.meta.arg
                state[feedType].isLoading = false
                state[feedType].error = action.payload as string
            })
    }
});

export default tweetsSlice.reducer;