import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userSlice from './user/userSlice';
import refSlice from './ref/refSlice';
import loanSlice from './loan/loanSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    refs: refSlice,
    loan: loanSlice,
  },
});


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store