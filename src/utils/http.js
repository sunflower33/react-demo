import axios from "axios";
import { changeRouterPageLoading } from "../redux/actionCreator/ActionLayout";
import { store } from "../redux/store";

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.request.use(
  function (config) {
    store.dispatch(changeRouterPageLoading(true));
    return config;
  },
  function (error) {
    store.dispatch(changeRouterPageLoading(false));
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    store.dispatch(changeRouterPageLoading(false));
    console.log("response------", response);
    return response;
  },
  function (error) {
    store.dispatch(changeRouterPageLoading(false));
    return Promise.reject(error);
  }
);
