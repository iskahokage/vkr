import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Layout from './components/layouts/Layout';
import { Provider } from 'react-redux';
import store from './redux/store';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path='/login'/>
                
                <Route element={<Layout/>} path='/'>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;