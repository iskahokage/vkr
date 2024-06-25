import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserCredentials, IAuthState } from "../../types/user";
import api, { baseUrl } from "../../helpers/interceptor";
import { Toast } from "primereact/toast";
import { RefObject } from "react";
import { AxiosError, AxiosResponse } from "axios";

// Attempt to retrieve and parse user data from localStorage
const getUserFromLocalStorage = (): IUser | null => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return null;
    }
};

interface LoginArgs {
    credentials: IUserCredentials;
    toast: RefObject<Toast>;
}

export const login = createAsyncThunk<IUser, LoginArgs>(
    // export const login = createAsyncThunk(
    "auth/login",
    async ({ credentials, toast }) => {
        try {
            const { data } = await api.post(baseUrl + "/auth/login", { email: credentials.email, password: credentials.password });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
        }
    }
);

const initialState: IAuthState = {
    user: getUserFromLocalStorage(),
    isAuthenticated: !!getUserFromLocalStorage(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ user: IUser | null }>) {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            if (action.payload.user) localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        setNewAvatar(state, action: PayloadAction<{ avatar: string }>) {
            state.user = {
                ...(state.user as IUser),
                avatar: action.payload.avatar,
            };
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
        },
    },
});

export const { setUser, logout, setNewAvatar } = authSlice.actions;
export default authSlice.reducer;
