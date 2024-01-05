import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Routers from "../../router/Routers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div className="layout">
            <Sidebar />
            <div className="main__layout">
                <Navbar />
                <div className="content">
                    <Routers />
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Layout;