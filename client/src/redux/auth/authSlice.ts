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
            const { data } = await api.post(baseUrl + "/auth/user/login", {email: credentials.email, password: credentials.password});
            console.log(data)
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
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
        })
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
