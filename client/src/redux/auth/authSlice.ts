import { createSlice } from '@reduxjs/toolkit';

let user  = localStorage.getItem('user');
let permissions = localStorage.getItem('permissions');

if(user){
    user = JSON.parse(user)
}
if(permissions){
    permissions = JSON.parse(permissions)
}
// const credentials = JSON.parse(localStorage.getItem('user'));
// const permissions = JSON.parse(localStorage.getItem('permissions'));

const initialState = {
    user,
    permissions,
    isAuthenticated: !!user,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            console.log(action)
            state.user = action.payload.user;
            state.permissions = action.payload.permissions;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('permissions', JSON.stringify(action.payload.permissions))
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user')
            localStorage.removeItem('permissions')
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;