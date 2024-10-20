import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        // Field-specific validation errors
        const fieldErrors = error.response.data.errors.reduce((acc, err) => {
          acc[err.path] = err.msg;
          return acc;
        }, {});
        return rejectWithValue(fieldErrors);
      }
      // Handle the specific "User already exists" error
      if (error.response.data.msg) {
        return rejectWithValue({ general: error.response.data.msg });
      }
      return rejectWithValue({ general: 'Registration failed' });
    }
    return rejectWithValue({ general: 'An unexpected error occurred' });
  }
});



export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/login`, credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // eslint-disable-next-line no-unused-vars
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;