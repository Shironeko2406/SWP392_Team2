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
              // src="../../../public/assets/img/kaiadmin/logo_light.svg"
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
              <h4 className="text-section">Dashboard</h4>
            </li>
            <li className="nav-item active submenu">
              <a data-bs-toggle="collapse" href="#user">
                <i class="fa fa-user"></i>
                <p>User</p>
                <span className="caret" />
              </a>
              <div className="collapse show" id="user">
                <ul className="nav nav-collapse">
                  <li className="active">
                    <NavLink to="/admin">
                      <span className="sub-item">User Account</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#tutor">
                <i class="fa fa-chalkboard-teacher"></i>
                <p>Tutor</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="tutor">
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/admin/tutor">
                      <span className="sub-item">Tutor Account</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#post">
                <i className="fas fa-paper-plane" />
                <p>Post</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="post">
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/admin/post-by-user">
                      <span className="sub-item">Post By User</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/pending">
                      <span className="sub-item">Pending</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#apply">
                <i className="fas fa-file-signature"></i>
                <p>Apply</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="apply">
                <ul className="nav nav-collapse">
                  <li>
                    <a href="../forms/forms.html">
                      <span className="sub-item">Apply 1</span>
                    </a>
                  </li>
                  <li>
                    <a href="../forms/forms.html">
                      <span className="sub-item">Apply 2</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#language">
                <i class="fa fa-language"></i>
                <p>Language</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="language">
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/admin/subject">
                      <span className="sub-item">Subject</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#Role">
                <i className="fas fa-user-tag"></i>
                <p>Role</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="Role">
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/admin/role">
                      <span className="sub-item">Role Detail</span>
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
