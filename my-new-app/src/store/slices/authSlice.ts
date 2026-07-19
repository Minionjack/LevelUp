/**
 * Auth Slice
 * Redux slice for authentication state
 */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiClient, extractErrorMessage } from "@/services/api";

import {
  AuthTokens,
  LoginCredentials,
  RegistrationData,
  User,
} from "../../../../shared/types";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

interface AuthResponseData extends AuthTokens {
  user: User;
}

export const registerUser = createAsyncThunk<
  AuthResponseData,
  RegistrationData
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response = await apiClient.post("/auth/register", data);
    return response.data.data as AuthResponseData;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const loginUser = createAsyncThunk<AuthResponseData, LoginCredentials>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      return response.data.data as AuthResponseData;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { state: { auth: AuthState } }
>("auth/me", async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await apiClient.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data as User;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setAuth: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Login failed";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        // A stale/invalid token shouldn't leave the app stuck thinking
        // it's authenticated.
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = (action.payload as string) ?? "Session expired";
      });
  },
});

export const { setLoading, setAuth, setUser, setError, logout } =
  authSlice.actions;

export default authSlice.reducer;
