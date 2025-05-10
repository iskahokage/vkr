import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Layout from "./components/layouts/Layout";
import Profile from "./pages/profile/Profile";
import NewUser from "./pages/admin/newUser/newUser";
import UserList from "./pages/admin/userList/UserList";
import LoanList from "./pages/admin/loanList/LoanList";
import NoPage from "./pages/404/NoPage";
import ProtectedRouteAdmin from "./components/ProtectedRoute/ProtectedRouteAdmin";
import ProtectedRouteUser from "./components/ProtectedRoute/ProtectedRouteUser";
import Home from "./pages/home/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path="/login" />
                <Route element={<Layout />} path="/">
                    <Route element={<Home />} path="/"/>
                    <Route path="/admin" element={<ProtectedRouteAdmin />}>
                        <Route element={<LoanList />} path="/admin/loans" />
                        <Route element={<NewUser />} path="/admin/new-user" />
                        <Route element={<UserList />} path="/admin/users" />
                        <Route element={<NewUser />} path="/admin/user/:id" />
                    </Route>
                    <Route element={<ProtectedRouteUser />}>
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<LoanList />} path="/user/loans" />
                    </Route>
                </Route>
                <Route element={<NoPage />} path="*" />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;