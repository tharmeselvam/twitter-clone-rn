import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileFeedState, ProfileInfoState } from "../../core/constants/types/ResultsState"
import { UserFull } from "../../core/constants/types/User";
import { profileRepository } from "../../core/services/repositories/profileRepository";
import { ProfileFeedType } from "../../core/constants/types/ProfileFeedType";
import { TweetFeed } from "../../core/constants/types/Tweet";

type ProfileState = {
    user: ProfileInfoState;
    tweets: ProfileFeedState;
    replies: ProfileFeedState;
    likedTweets: ProfileFeedState;
}

interface FetchProfileFeedSuccess {
    feedType: ProfileFeedType;
    feedData: TweetFeed;
}

const initialProfileInfoState: ProfileInfoState = {
    isLoading: false,
    data: null,
    error: null
}

const initialFeedState: ProfileFeedState = {
    isLoading: false,
    data: [],
    error: null,
}

const initialState: ProfileState = {
    user: initialProfileInfoState,
    tweets: {...initialFeedState},
    replies: {...initialFeedState},
    likedTweets: {...initialFeedState}
}

export const fetchProfileInfo = createAsyncThunk<UserFull, void, { rejectValue: string }>(
    'profile/fetchProfileInfo',
    async (_, { rejectWithValue }) => {
        const result = await profileRepository.fetchOwnProfile()

        if (!result.success) {
            return rejectWithValue(result.error.message)
        }

        return result.data as UserFull
    }
)

export const fetchProfileFeed = createAsyncThunk<FetchProfileFeedSuccess, ProfileFeedType, { rejectValue: string }>(
    'profile/fetchProfileFeed',
    async(feedType, { rejectWithValue }) => {

        let result
        switch (feedType) {
            case 'tweets':
                result = await profileRepository.fetchOwnTweets(false)
                break
            case 'replies':
                result = await profileRepository.fetchOwnTweets(true)
                break
            case 'likedTweets':
                result = await profileRepository.fetchLikedTweets()
                break
        }

        if (!result.success) {
            return rejectWithValue(result.error.message)
        }

        return { feedType, feedData: result.data } as FetchProfileFeedSuccess
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch profile info
            .addCase(fetchProfileInfo.pending, (state) => {
                state.user.isLoading = true
                state.user.error = null
            })
            .addCase(fetchProfileInfo.fulfilled, (state, action) => {
                state.user.isLoading = false
                state.user.data = action.payload
                state.user.error = null
            })
            .addCase(fetchProfileInfo.rejected, (state, action) => {
                state.user.isLoading = false
                state.user.error = action.payload as string
            })

            // Fetch profile tweet feed
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
})

export default profileSlice.reducer