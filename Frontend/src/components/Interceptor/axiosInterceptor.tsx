import axios from "axios";
import React from "react";
import { getAccessToken } from "../../services/localStorageService";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../Redux/header/actions";

export default function Interceptor() {
  const dispatch = useDispatch();
  axios.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers["accesstoken"] = token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;

      debugger;
      if (error.response.status === 401) {
        dispatch(signOutAction());
        localStorage.clear();
        debugger;
        window.location.assign("/main");
      }
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("RefreshToken");
        debugger;
        return axios
          .post("http://localhost:8000/auth/refreshTokens", { refreshToken })
          .then((res) => {
            debugger;
            if (res.status === 200) {
              const token = res.data.AccessToken;
              const refresh = res.data.RefreshToken;
              localStorage.setItem("AccessToken", token);
              localStorage.setItem("RefreshToken", refresh);
              axios.defaults.headers.common["accesstoken"] = token;
              return axios(originalRequest);
            }
            if (res.status === 401) {
              dispatch(signOutAction());
              localStorage.clear();
            }
          });
      }
      return Promise.reject(error);
    }
  );
  return <div></div>;
}
