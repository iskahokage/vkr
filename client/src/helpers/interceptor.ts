import store from '../redux/store'
import { logout, setUser } from "../redux/auth/authSlice";
import axios from "axios";
import { IUser } from "../types/user";
export const baseUrl = process.env.REACT_APP_BASE_URL;
const api = axios.create();


export const getToken = () => {
    const user = localStorage.getItem("user")
    if(typeof user === 'string'){
        const accessToken = JSON.parse(user).accessToken;
        return accessToken;
    }
};

const refreshAuthToken = async () => {
    const response = await axios.get(baseUrl + "/user/refresh",  {withCredentials: true});
    return response.data
};

const setToken = (newData: IUser) => {
    if(newData)
    store.dispatch(setUser({user: newData}));
};

api.interceptors.request.use((config) => {
    const authToken = getToken(); // Replace with your function to get the authentication token
    if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // if (error.response && error.response.status === 500){

        // }
        if (error.response && error.response.status === 401) {
                try {
                    const newAuthToken = await refreshAuthToken(); // Replace with your function to refresh the token
                    setToken(newAuthToken); // Replace with your function to store the new token
                    // Retry the original request with the new token
                    const originalRequest = error.config;
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAuthToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    // Handle refresh token failure (e.g., redirect to login page)
                    store.dispatch(logout())
                    return Promise.reject(refreshError);
                }
        }
        return Promise.reject(error);
    }
);

export default api;
