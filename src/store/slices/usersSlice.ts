import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileInfoState } from "../../core/constants/types/ResultsState"
import { UserFull } from "../../core/constants/types/User";
import { usersRepository } from "../../core/services/repositories/usersRepository";

type UsersState = {
    currentUser: ProfileInfoState;
}

const initialUserProfileState: ProfileInfoState = {
    isLoading: false,
    data: null,
    error: null
}

const initialState: UsersState = {
    currentUser: initialUserProfileState,
}

export const fetchOwnProfileInfo = createAsyncThunk<UserFull, void, { rejectValue: string }>(
    'users/fetchOwnProfileInfo',
    async (_, { rejectWithValue }) => {
        const result = await usersRepository.fetchOwnProfile()

        if (!result.success) {
            return rejectWithValue(result.error.message)
        }

        return result.data as UserFull
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch profile info
            .addCase(fetchOwnProfileInfo.pending, (state) => {
                state.currentUser.isLoading = true
                state.currentUser.error = null
            })
            .addCase(fetchOwnProfileInfo.fulfilled, (state, action) => {
                state.currentUser.isLoading = false
                state.currentUser.data = action.payload
                state.currentUser.error = null
            })
            .addCase(fetchOwnProfileInfo.rejected, (state, action) => {
                state.currentUser.isLoading = false
                state.currentUser.error = action.payload as string
            })
    }
})

export default usersSlice.reducer