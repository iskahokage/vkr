import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Layout from './components/layouts/Layout';
import { Provider } from 'react-redux';
import store from './redux/store';
import Profile from './pages/profile/Profile';
import NewUser from './pages/admin/newUser/newUser';
import UserList from './pages/admin/userList/UserList';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path='/login'/>
                <Route element={<Layout/>} path='/'>
                <Route element={<Profile/>} path='/profile'/>
                <Route path='/admin'>
                <Route element={<NewUser/>} path='/admin/new-user'/>
                <Route element={<UserList/>} path='/admin/users'/>
                <Route element={<NewUser/>} path='/admin/user/:id'/>
                </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;