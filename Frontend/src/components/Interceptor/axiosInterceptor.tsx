import  axios  from "axios";
import React from "react"
import { getAccessToken } from "../../services/localStorageService";

const Interceptor = () => {
    axios.interceptors.request.use(
        config => {
            const token = getAccessToken();
            if (token) {
                config.headers['accesstoken'] =  token;
            }
            return config;
        },
        error => {
            Promise.reject(error)
        });

        axios.interceptors.response.use((response) => {
            return response
         }, function (error) {
            const originalRequest = error.config;
         
            if (error.response.status === 401)
                //  originalRequest.url === 'http://13.232.130.60:8081/v1/auth/token')
                  {
                return Promise.reject(error);
            }
            if (error.response.status === 403 && !originalRequest._retry) {
                
                originalRequest._retry = true;
                const refreshToken = localStorage.getItem("RefreshToken")
                debugger
                return axios.post('http://localhost:8000/auth/refreshTokens',{refreshToken})
                .then(res => {
                    if (res.status === 403) {
                        localStorage.clear()
                            debugger
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getAccessToken();
                            return axios(originalRequest);
                        }
                    })
            }
            return Promise.reject(error);
         });
    return(
        <div></div>
    )
}

export default Interceptor