import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios_interceptor';

import { IDLE, SUCCESS, ERROR, LOADING } from '../constants';


export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (arg, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.token ? state.user.token : localStorage.getItem('jwt');
      const config = {
        headers: { Authorization: `Bearer ${token}`}
      };
      let url = `/users/profile/`;
      const response = await axios.get(url, config);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }

  }
)
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (arg, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.token ? state.user.token : localStorage.getItem('jwt');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      let url = `/users/logout/`;
      const response = await axios.get(url, config);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)
const userSlice = createSlice({
  name: "user",
  initialState: {
    status: IDLE,
  },
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.session_key = action.payload.session_key;
    },
    clearErrors: (state) => {
      state.status = IDLE;
      state.error = null;
    },
    resetSuccess: (state) => {
      state.status = IDLE;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = SUCCESS;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.session_key = action.payload.session_key;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.session_key = null;
        state.token = null;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = SUCCESS;
        state.isAuthenticated = false;
        state.user = null;
        state.session_key = null;
        state.token = null;
        localStorage.removeItem("jwt");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = ERROR;
        state.error = action.payload.errors;
      });
  },
});


export const { clearErrors, resetSuccess, authenticateUser } = userSlice.actions;
export default userSlice.reducer