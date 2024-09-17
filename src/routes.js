import React from "react";
import {Routes,Route} from 'react-router-dom';
import Registration from "./auth/Registration";
import Login from './auth/login';
import MainPage from "./mainPage/main-page";
import CurrentChat from "./mainPage/currentChat";
import Users from "./pages/users";
import Dashboard from "./dashboard/dashboard";

const Router = ()=>{
    return (
        <Routes>
            <Route path="/" element={<Registration></Registration>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="/main" element={<MainPage></MainPage>}></Route>
            <Route path="/current-Chat" element={<CurrentChat></CurrentChat>}></Route>
            <Route path="/users" element={<Users></Users>}></Route>
        </Routes>
    )
}

export default Router;