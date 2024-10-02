import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios_interceptor";
import { get_jwt_token } from "../../api/helper_funtions";

import { IDLE, SUCCESS, ERROR, LOADING } from "../constants";

//blank string will be the ip provided by customer, else we use current url
let currentUrl;
let oauthUrl;
let auditsUrl;
let mediaUrl;
if (process.env.NODE_ENV === "production") {
  currentUrl = `${window.location.origin}/apps`;
  oauthUrl = `${window.location.origin}/openid/`;
  auditsUrl = `${window.location.origin}`;
  mediaUrl = `${window.location.origin}`;
}
if (process.env.NODE_ENV === "development") {
  currentUrl =
    "" || `${window.location.protocol}//${window.location.hostname}:8009`;
  oauthUrl =
    "" ||
    `${window.location.protocol}//${window.location.hostname}:8002/openid/`;
  auditsUrl =
    "" || `${window.location.protocol}//${window.location.hostname}:8001`;
  mediaUrl =
    "" || `${window.location.protocol}//${window.location.hostname}:8009`;
}

export const getSessionInfo = createAsyncThunk(
  "audits/getSessionInfo",
  async (arg, thunkAPI) => {
    try {
      const token = get_jwt_token();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let url = `/audits/session-recording/`;
      const response = await axios.get(url, config);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getLiveStreamInfo = createAsyncThunk(
  "audits/getLiveStreamInfo",
  async (arg, thunkAPI) => {
    try {
      const token = get_jwt_token();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let url = `/customer/live-stream-setting/`;
      const response = await axios.get(url, config);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    status: IDLE,
    serverUrl: currentUrl,
    oauthUrl: oauthUrl,
    auditsUrl: auditsUrl,
    mediaUrl: mediaUrl,
    recordSession: "",
    liveStream: "",
  },
  reducers: {
    clearErrors: (state) => {
      state.status = IDLE;
      state.error = null;
    },
    resetSuccess: (state) => {
      state.status = IDLE;
      state.successMessage = null;
    },
    setRecordSession: (state, action) => {
      state.recordSession = action.payload.record_session;
    },
    setLiveStream: (state, action) => {
      state.liveStream = action.payload.live_stream;
    },
  },
  extraReducers: {
    [getSessionInfo.pending]: (state) => {
      state.status = LOADING;
    },
    [getSessionInfo.fulfilled]: (state, action) => {
      state.status = SUCCESS;
      state.recordSession = action.payload.value;
    },
    [getSessionInfo.rejected]: (state, action) => {
      state.error = action.payload.errors;
      state.status = ERROR;
    },
    [getLiveStreamInfo.pending]: (state) => {
      state.status = LOADING;
    },
    [getLiveStreamInfo.fulfilled]: (state, action) => {
      state.status = SUCCESS;
      state.liveStream = action.payload.value;
    },
    [getLiveStreamInfo.rejected]: (state, action) => {
      state.error = action.payload.errors;
      state.status = ERROR;
    },
  },
});

export const { clearErrors, resetSuccess, setRecordSession, setLiveStream } =
  customerSlice.actions;
export default customerSlice.reducer;
