import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResetPassword, IUser, IUserCredentials, IUserState } from '../../types/user';
import api, { baseUrl } from '../../helpers/interceptor';
import { setNewAvatar, setUser } from '../auth/authSlice';
import Popup from '../../components/Popup/Popup';

// Attempt to retrieve and parse user data from localStorage

export const patchAvatar = createAsyncThunk<any, FormData>(
    'uploadAvatar/patch',
    async(formData) =>{
        try {
            const { data }= await api.patch(baseUrl + "/user/avatar", formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            Popup('asd')
            return data
        } catch (error) {
            console.error('Upload Failed', error)
        }
    }
)

export const changePassword = createAsyncThunk<any, IResetPassword>(
    'changePassword/patch',
    async(payload) =>{
        try {
            const { data }= await api.patch(baseUrl + "/auth/password", payload);
            return data
        } catch (error) {
            console.error('Upload Failed', error)
        }
    }
)