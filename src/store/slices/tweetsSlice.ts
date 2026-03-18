import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Tweet, TweetFeed, TweetLike } from "../../core/constants/types/Tweet";
import { tweetsRepository } from "../../core/services/repositories/tweetsRepository";
import { TweetsFeedState } from "../../core/constants/types/ResultsState";
import { ProfileFeedType } from "../../core/constants/types/ProfileFeedType";
import { RootState } from "..";
import { fetchSearchedTweets } from "./searchSlice";

type TweetsState = {
    byId: Record<number, Tweet>;
    homeFeed: TweetsFeedState;
    profileTweetsFeed: TweetsFeedState;
    profileRepliesFeed: TweetsFeedState;
    profileLikesFeed: TweetsFeedState;
}

interface FetchProfileFeedSuccess {
    feedType: ProfileFeedType;
    feedData: TweetFeed;
}

const initialTweetsFeedState: TweetsFeedState = {
    isLoading: false,
    tweetIds: [],
    error: null,
}

const initialTweetsState: TweetsState = {
    byId: {},
    homeFeed: initialTweetsFeedState,
    profileTweetsFeed: initialTweetsFeedState,
    profileRepliesFeed: initialTweetsFeedState,
    profileLikesFeed: initialTweetsFeedState,
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
    async (feedType, { rejectWithValue }) => {

        let result
        switch (feedType) {
            case 'profileTweetsFeed':
                result = await tweetsRepository.fetchOwnTweets(false)
                break
            case 'profileRepliesFeed':
                result = await tweetsRepository.fetchOwnTweets(true)
                break
            case 'profileLikesFeed':
                result = await tweetsRepository.fetchLikedTweets()
                break
        }

        if (!result.success) {
            return rejectWithValue(result.error.message)
        }

        return { feedType, feedData: result.data } as FetchProfileFeedSuccess
    }
)

export const toggleLikeTweet = createAsyncThunk<TweetLike, number, { rejectValue: string }>(
    'tweets/toggleTweetLike',
    async (tweetId, { rejectWithValue }) => {
        const result = await tweetsRepository.toggleLikeTweet(tweetId)

        if (!result.success) {
            return rejectWithValue(result.error.message)
        }

        return result.data as TweetLike
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
                state.homeFeed.isLoading = true;
                state.homeFeed.error = null;
            })
            .addCase(fetchHomeFeed.fulfilled, (state, action) => {
                action.payload.tweets.forEach(tweet => {
                    state.byId[tweet.id] = tweet
                })
                state.homeFeed.isLoading = false;
                state.homeFeed.tweetIds = action.payload.tweets.map(tweet => tweet.id);
            })
            .addCase(fetchHomeFeed.rejected, (state, action) => {
                state.homeFeed.isLoading = false;
                state.homeFeed.error = action.payload as string;
            })

            // Profile Feed
            .addCase(fetchProfileFeed.pending, (state, action) => {
                const feedType = action.meta.arg
                state[feedType].isLoading = true
                state[feedType].error = null
            })
            .addCase(fetchProfileFeed.fulfilled, (state, action) => {
                const { feedType, feedData } = action.payload
                feedData.tweets.forEach(tweet => {
                    state.byId[tweet.id] = tweet
                })
                state[feedType].isLoading = false
                state[feedType].tweetIds = feedData.tweets.map(tweet => tweet.id)
                state[feedType].error = null
            })
            .addCase(fetchProfileFeed.rejected, (state, action) => {
                const feedType = action.meta.arg
                state[feedType].isLoading = false
                state[feedType].error = action.payload as string
            })

            // Fetch searched tweets
            .addCase(fetchSearchedTweets.fulfilled, (state, action) => {
                action.payload.tweets.forEach(tweet => {
                    state.byId[tweet.id] = tweet
                })
            })
    }
});

export const selectHomeFeed = (state: RootState) => {
    return state.tweets.homeFeed.tweetIds.map(id => state.tweets.byId[id])
}

export const selectProfileTweetsFeed = (state: RootState) => {
    return state.tweets.profileTweetsFeed.tweetIds.map(id => state.tweets.byId[id])
}

export const selectProfileRepliesFeed = (state: RootState) => {
    return state.tweets.profileRepliesFeed.tweetIds.map(id => state.tweets.byId[id])
}

export const selectProfileLikesFeed = (state: RootState) => {
    return state.tweets.profileLikesFeed.tweetIds.map(id => state.tweets.byId[id])
}

export default tweetsSlice.reducer;