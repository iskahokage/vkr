import { AppDispatch } from '../redux/store';
import { logout, setUser } from '../redux/auth/authSlice';
import { IUser } from '../types/user';
import api, { baseUrl } from './interceptor';

export const refreshAndSetToken = async (dispatch: AppDispatch) => {
    try {
        const newAuthToken = await refreshAuthToken();
        dispatch(setUser({ user: newAuthToken }));
        return newAuthToken;
    } catch (error) {
        dispatch(logout());
        throw error;
    }
};

const refreshAuthToken = async (): Promise<IUser> => {
    const response = await api.get(baseUrl + "/user/refresh", { withCredentials: true });
    return response.data;
};