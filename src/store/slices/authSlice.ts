import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authRepository } from "../../core/services/repositories/authRepository";
import { SecureStorage } from "../../core/services/secureStorage/SecureStorage";

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

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = await SecureStorage.getAccessToken();
        
            if (accessToken) {
                return true;
            } else {
                rejectWithValue("No token found.");
            }
        } catch (error: any) {
            rejectWithValue(error.message);
        }
    }
)

export const logIn = createAsyncThunk(
    'auth/logIn',
    async (
        { email, password }: { email: string, password: string },
        { rejectWithValue }
    ) => {
        if (email.length === 0 || password.length === 0) {
            const errorMessage = email.length === 0
                ? "Email cannot be empty."
                : "Password cannot be empty."
            
            return rejectWithValue(errorMessage);
        }

        const result = await authRepository.login({ email, password });
        console.log(result);
        
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
            .addCase(checkAuth.fulfilled, (state) => { 
                state.isLoggedIn = true; 
                state.isLoading = false; 
                state.errorMessage = null; 
            })
            .addCase(checkAuth.rejected, (state, action) => { 
                state.isLoggedIn = false;
                state.isLoading = false; 
                state.errorMessage = action.payload as string;
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