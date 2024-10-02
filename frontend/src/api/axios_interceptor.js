import axios from "axios";
import { loadUser } from "../state/slices/user";
import { store } from "../state/store";
const api = axios.create();

api.interceptors.request.use(
  function (config) {
    let state = store.getState();
    config.baseURL = state.customer.serverUrl;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let state = store.getState();
    if (
      (error.response.status === 403 || error.response.status === 406) &&
      state.user.isAuthenticated === true
    ) {
      store.dispatch(loadUser());
    }
    return Promise.reject(error);
  }
);

export default api;
