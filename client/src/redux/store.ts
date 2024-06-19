import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userSlice from './user/userSlice';
import refSlice from './ref/refSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    refs: refSlice,
  },
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export default store