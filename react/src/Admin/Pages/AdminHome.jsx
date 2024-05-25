import React from "react";
import AdminHeader from "../Component/AdminHeader";
import "../../AppAdmin.css";
import NavMenuAdmin from "../Component/NavMenuAdmin";
import { Outlet } from "react-router-dom";


const AdminHome = () => {
  return (
    <div className="sb-nav-fixed">
      <AdminHeader></AdminHeader>
      <div id="layoutSidenav">
        <NavMenuAdmin></NavMenuAdmin>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminHome;
