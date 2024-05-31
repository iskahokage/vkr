import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
    return (
        <div>
            <Header />
            <div style={{
                height: "calc(100vh - 15rem)"
            }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
