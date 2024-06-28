import React from "react";
import { NavLink } from "react-router-dom";

const NavMenuAdmin = () => {
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        {/* Logo Header */}
        <div className="logo-header" data-background-color="dark">
          <a href="../index.html" className="logo">
            <img
              src="../assets/img/kaiadmin/logo_light.svg"
              alt="navbar brand"
              className="navbar-brand"
              height={20}
            />
          </a>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right" />
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left" />
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt" />
          </button>
        </div>
        {/* End Logo Header */}
      </div>
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h" />
              </span>
              <h4 className="text-section">User Management</h4>
            </li>
            <li className="nav-item">
                <a data-bs-toggle="collapse" href="#forms">
                  <i className="fas fa-pen-square" />
                  <p>Forms</p>
                  <span className="caret" />
                </a>
                <div className="collapse" id="forms">
                  <ul className="nav nav-collapse">
                    <li>
                      <a href="../forms/forms.html">
                        <span className="sub-item">Basic Form</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            <li className="nav-item active submenu">
              <a data-bs-toggle="collapse" href="#tables">
                <i className="fas fa-table" />
                <p>User</p>
                <span className="caret" />
              </a>
              <div className="collapse show" id="tables">
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/admin">
                      <span className="sub-item">Account</span>
                    </NavLink>
                  </li>
                  <li className="active">
                    <NavLink to="/admin/form">
                      <span className="sub-item">Datatables</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavMenuAdmin;
