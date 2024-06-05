import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResetPassword} from '../../types/user';
import api, { baseUrl } from '../../helpers/interceptor';
import { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import axios, { AxiosError } from 'axios';

// Attempt to retrieve and parse user data from localStorage

export const fetchUserGRS = createAsyncThunk<any, FormData>(
    'fetchUser GRS',
    async(formData) =>{
        try {
            const { data }= await axios.post(baseUrl + "/user/grs", formData, {
                headers: {
                    // "Content-Type": 'multipart/form-data'
                    // Authorization: process.env.REACT_APP_GRS_TOKEN
                }
            });
            console.log(data)
            return data
        } catch (error) {
            console.error('Upload Failed', error)
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