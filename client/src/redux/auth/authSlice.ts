import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserCredentials, IUserState } from '../../types/user';
import api, { baseUrl } from '../../helpers/interceptor';

// Attempt to retrieve and parse user data from localStorage
const getUserFromLocalStorage = (): IUser | null => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to parse user from localStorage', error);
    return null;
  }
};

export const login = createAsyncThunk<IUser, IUserCredentials>(
    "auth/login",
    async (credentials: IUserCredentials) => {
        try {
            const { data } = await api.post(baseUrl + "/auth/login", {email: credentials.email, password: credentials.password});
            return data;
        } catch (error) {
            console.error('Token refresh failed:', error)
        }
    }
);

const initialState: IUserState = {
    user: getUserFromLocalStorage(),
    isAuthenticated: !!getUserFromLocalStorage(),
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: IUser | null }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    setNewAvatar(state, action: PayloadAction<{avatar: string}>){
      console.log(action)
      state.user = {
        ...state.user as IUser,
        avatar: action.payload.avatar
      }
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, logout, setNewAvatar } = authSlice.actions;
export default authSlice.reducer;
