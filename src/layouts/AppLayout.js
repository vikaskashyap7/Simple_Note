import { Link, NavLink, Outlet, Router } from "react-router-dom";
import { useEffect, useState } from "react";

import "../assets/css/app.css";
import Login from "../views/Login"
import Header from "../components/navs/Header";
import Sidebar from "../components/navs/Sidebar";
import { Row } from "reactstrap";
import HomeView from "../views/HomeView";


const AppLayout = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isLogin,setIsLogin] = useState(true);

    useEffect(() => {
        setIsMounted(true);

        return () => setIsMounted(false);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
           
                <div>
                    <Header appName="Simple Notes" homePage="/" logoutLink="" />
                    <div className="container-fluid">           
                        <Row>
                            <Sidebar />
                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-5">
                                <Outlet />
                            </main>
                        </Row>
                    </div>
                    <div className="homeView">
                        <HomeView/>
                    </div>
               </div>
            
           
            
            
        </>
    );
};

export default AppLayout;
