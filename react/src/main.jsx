import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./User/Pages/Login.jsx";
import Register from "./User/Pages/Register.jsx";
import Home from "./User/Pages/Home.jsx";
import PostContent from "./User/Component/PostContent.jsx";
import UserDetail from "./User/Pages/UserDetail.jsx";
import AppointmentSchedule from "./User/Pages/AppoimentSchedule.jsx";
import AdminHome from "./Admin/Pages/AdminHome.jsx";

import HomeDashBoard from "./Admin/Pages/HomeDashBoard.jsx";
import UserTable from "./Admin/Pages/UserTable.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home></Home>}>
          <Route path="" element={<PostContent></PostContent>}></Route>
          <Route path="user-detail" element={<UserDetail></UserDetail>}></Route>
          <Route path="appointment-schedule" element={<AppointmentSchedule></AppointmentSchedule>}></Route>
        </Route>
        <Route path="admin" element={<AdminHome></AdminHome>} >
          
          <Route path="" element={<HomeDashBoard></HomeDashBoard>}></Route>
          <Route path="user-table" element={<UserTable></UserTable>}></Route>

        </Route>


      </Routes>
    </BrowserRouter>
);
