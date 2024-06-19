import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Layout from './components/layouts/Layout';
import { Provider } from 'react-redux';
import store from './redux/store';
import Profile from './pages/profile/Profile';
import NewUser from './pages/newUser/newUser';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path='/login'/>
                <Route element={<Layout/>} path='/'>
                <Route element={<Profile/>} path='/profile'/>
                <Route element={<NewUser/>} path='/new-user'/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;