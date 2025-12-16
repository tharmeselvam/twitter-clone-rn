import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authRepository } from "../../core/services/repositories/authRepository";

type AuthState = {
    isLoggedIn: boolean;
    isLoading: boolean;
    errorMessage: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    isLoading: true,
    errorMessage: null
}

export const logIn = createAsyncThunk(
    'auth/login',
    async (
        { email, password }: { email: string, password: string },
        { rejectWithValue }
    ) => {
        const result = await authRepository.login({ email, password });
        console.log(result);
        
        if (result.success) {
            return true;
        } else {
            return rejectWithValue(result.error.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        // CHECK AUTH
        return false;
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
            .addCase(logIn.rejected, (state, action) => { state.isLoggedIn = false; state.isLoading = false; state.errorMessage = action.payload as string })

            .addCase(checkAuth.pending, (state) => { state.isLoading = true; })
            .addCase(checkAuth.fulfilled, (state, action) => { state.isLoggedIn = action.payload; state.isLoading = false; })
            .addCase(checkAuth.rejected, (state) => { state.isLoggedIn = false; state.isLoading = false; })
    },
});

export default authSlice.reducer;