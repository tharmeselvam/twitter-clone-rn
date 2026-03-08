import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authRepository } from "../../core/services/repositories/authRepository";

type AuthState = {
    isLoggedIn: boolean;
    isLoading: boolean;
    errorMessage: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    isLoading: false,
    errorMessage: null
}

export const checkAuth = createAsyncThunk<boolean, void>(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        const isAuthenticated = await authRepository.checkAuthStatus();
        return isAuthenticated;
    }
)

export const logIn = createAsyncThunk(
    'auth/logIn',
    async (
        { email, password }: { email: string, password: string },
        { rejectWithValue }
    ) => {
        const result = await authRepository.login({ email, password });
        
        if (result.success) {
            return true;
        } else {
            return rejectWithValue(result.error.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Check Auth
            .addCase(checkAuth.pending, (state) => { 
                state.isLoading = true; 
                state.errorMessage = null; 
            })
            .addCase(checkAuth.fulfilled, (state, action) => { 
                state.isLoggedIn = action.payload; 
                state.isLoading = false; 
                state.errorMessage = null; 
            })
            .addCase(checkAuth.rejected, (state, action) => { 
                state.isLoggedIn = false;
                state.isLoading = false; 
                state.errorMessage = null;
            })

            // Log In
            .addCase(logIn.pending, (state) => { 
                state.isLoading = true; 
                state.errorMessage = null;
            })
            .addCase(logIn.fulfilled, (state) => { 
                state.isLoggedIn = true; 
                state.isLoading = false;
                state.errorMessage = null; 
            })
            .addCase(logIn.rejected, (state, action) => { 
                state.isLoading = false; 
                state.errorMessage = action.payload as string; })
    },
});

export default authSlice.reducer;