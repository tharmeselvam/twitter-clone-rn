import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthState = {
    isLoggedIn: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false,
    isLoading: true
}

export const logIn = createAsyncThunk(
    'auth/login',
    async () => {
        // LOG IN
        return true;
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        // CHECK AUTH
        return true;
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => { state.isLoading = true; })
            .addCase(logIn.fulfilled, (state) => { state.isLoggedIn = true; state.isLoading = false; })
            .addCase(logIn.rejected, (state) => { state.isLoggedIn = false; state.isLoading = false; })

            .addCase(checkAuth.pending, (state) => { state.isLoading = true; })
            .addCase(checkAuth.fulfilled, (state, action) => { state.isLoggedIn = action.payload; state.isLoading = false; })
            .addCase(checkAuth.rejected, (state) => { state.isLoggedIn = false; state.isLoading = false; })
    },
});

export default authSlice.reducer;