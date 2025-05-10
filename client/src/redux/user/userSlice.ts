import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INewUser, IResetPassword, IUser, IUserState} from '../../types/user';
import api, { baseUrl } from '../../helpers/interceptor';
import { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import  { AxiosError } from 'axios';
import { emptyUser } from '../../types/userJSON';

// Attempt to retrieve and parse user data from localStorage

export const fetchUserGRS = createAsyncThunk<any, {formData: FormData, toast: RefObject<Toast>}>(
    'fetchUser GRS',
    async({formData, toast}) =>{
        try {
            const { data }= await api.post(baseUrl + "/user/grs", formData, {
            });
            return data
        } catch (error) {
            const err = error as AxiosError;
            console.log(err)
            toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
        }
    }
)


export const patchAvatar = createAsyncThunk<any, FormData>(
    'uploadAvatar/patch',
    async(formData) =>{
        try {
            const { data }= await api.patch(baseUrl + "/user/avatar", formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            return data
        } catch (error) {
            console.error('Upload Failed', error)
        }
    }
)

interface changePassArgs {
    newPassword: IResetPassword,
    toast: RefObject<Toast>
}

export const changePassword = createAsyncThunk<any, changePassArgs>(
    'changePassword/patch',
    async({newPassword, toast}) =>{
        try {
            const { data }= await api.patch(baseUrl + "/auth/password", newPassword);
            return data
        } catch (error) {
            const err = error as AxiosError;
            toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
        }
    }
)

interface newUserArgs {
    userData: INewUser,
    toast: RefObject<Toast>
}

export const createUser = createAsyncThunk<any, newUserArgs>(
    'createUser/post',
    async({userData, toast}) =>{
        try {
            const { data }= await api.post(baseUrl + "/auth/register", userData);
            return data
        } catch (error) {
            const err = error as AxiosError;
            toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
        }
    }
)
export const updateUser = createAsyncThunk<any, newUserArgs>(
    'updateUser/patch',
    async({userData, toast}) =>{
        try {
            const { data, status }= await api.patch(baseUrl + "/user/update/" + userData.id, userData);
            if(status === 200){

            toast.current?.show({ severity: "success", summary: "Данные сотрудника обновлены", life: 3000 });
            }
            return data
        } catch (error) {
            const err = error as AxiosError;
            toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
        }
    }
)


export const fetchUserList =  createAsyncThunk<any, {toast: RefObject<Toast>}>(
    'fetchUserList/get',
    async({toast}) => {
        try {
            const { data }= await api.get(baseUrl + "/user");
            return data
        } catch (error) {
            const err = error as AxiosError;
            toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
        }
    }
)
export const fetchUser =  createAsyncThunk<any, {toast: RefObject<Toast>, id: string}>(
    'fetchUser/get',
    async({toast, id}) => {
        try {
            const { data }= await api.get(baseUrl + "/user/" + id);
            return data
        } catch (error) {
            const err = error as AxiosError;
            toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
        }
    }
)
export const changeUserActivity =  createAsyncThunk<any, {toast: RefObject<Toast>, id: string | number}>(
    'changeUserActivity/post',
    async({toast, id}) => {
        try {
            const { data, status }= await api.patch<IUser>(baseUrl + "/user/activity/" + id);
            if(status === 200){
                
                toast.current?.show({ severity: "success", summary: `Пользователь ${data.surname} ${data.name} ${data.active ? 'активирован' : 'деактивирован'}`, life: 2000 })
            }
            return data
        } catch (error) {
            const err = error as AxiosError;
            toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
        }
    }
)


const initialState: IUserState = {
    spin: false,
    userList: [],
    user: emptyUser
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserGRS.pending, (state) => {
            state.spin = true;
        })
        .addCase(fetchUserGRS.fulfilled, (state) => {
            state.spin = false;
        })
        .addCase(fetchUserList.pending, (state) => {
            state.spin = true;
        })
        .addCase(fetchUserList.fulfilled, (state, {payload}) => {
            state.spin = false;
            state.userList = payload
        })
        .addCase(fetchUserList.rejected, (state, {payload}) => {
            state.spin = false;
            state.userList = []
        })
        .addCase(fetchUser.pending, (state) => {
            state.spin = true;
        })
        .addCase(fetchUser.fulfilled, (state, {payload}) => {
            state.spin = false;
            state.user = payload
        })
        .addCase(fetchUser.rejected, (state, {payload}) => {
            state.spin = false;
            state.user = emptyUser
        })
        .addCase(changeUserActivity.fulfilled, (state, {payload}) => {
            const response: IUser = payload;
            if(response)
                state.userList = state.userList.map(el => el.id === response.id ? response : el)
        })
    }
});

export default userSlice.reducer;