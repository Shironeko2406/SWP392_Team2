import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getDataJSONStorage,
  removeDataTextStorage,
  TOKEN_AUTHOR,
  USER_LOGIN,
} from "../../Utils/UtilFuction";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfileActionAsync } from "../../Redux/Reducer/UserReducer";

const AdminHeader = () => {
  const navigate = useNavigate();
  const user = getDataJSONStorage(USER_LOGIN);
  const { userProfile } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // action get data user
    const actionAsync = GetUserProfileActionAsync();
    dispatch(actionAsync);
  }, []);

  return (
    <div className="main-header">
      <div className="main-header-logo">
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
      {/* Navbar Header */}
      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
            <div className="input-group">
              <div className="input-group-prepend">
                <button type="submit" className="btn btn-search pe-1">
                  <i className="fa fa-search search-icon" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Search ..."
                className="form-control"
              />
            </div>
          </nav>
          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
            
            <li className="nav-item topbar-icon dropdown hidden-caret d-none">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="notifDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-bell" />
                <span className="notification">4</span>
              </a>
              <ul
                className="dropdown-menu notif-box animated fadeIn"
                aria-labelledby="notifDropdown"
              >
                <li>
                  <div className="dropdown-title">
                    You have 4 new notification
                  </div>
                </li>
                <li>
                  <div className="notif-scroll scrollbar-outer">
                    <div className="notif-center">
                      <a href="#">
                        <div className="notif-icon notif-primary">
                          <i className="fa fa-user-plus" />
                        </div>
                        <div className="notif-content">
                          <span className="block"> New user registered </span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-icon notif-success">
                          <i className="fa fa-comment" />
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Rahmad commented on Admin
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="../assets/img/profile2.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Reza send messages to you
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-icon notif-danger">
                          <i className="fa fa-heart" />
                        </div>
                        <div className="notif-content">
                          <span className="block"> Farrah liked Admin </span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <a className="see-all" href="javascript:void(0);">
                    See all notifications
                    <i className="fa fa-angle-right" />
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item topbar-icon dropdown hidden-caret">
              <a
                className="nav-link"
                data-bs-toggle="dropdown"
                href="#"
                aria-expanded="false"
              >
                <i className="fas fa-layer-group" />
              </a>
              <div className="dropdown-menu quick-actions animated fadeIn">
                <div className="quick-actions-header">
                  <span className="title mb-1">Quick Actions</span>
                  <span className="subtitle op-7">Shortcuts</span>
                </div>
                <div className="quick-actions-scroll scrollbar-outer">
                  <div className="quick-actions-items">
                    <div className="row m-0">
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-danger rounded-circle">
                            <i className="far fa-calendar-alt" />
                          </div>
                          <span className="text">Calendar</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-warning rounded-circle">
                            <i className="fas fa-map" />
                          </div>
                          <span className="text">Maps</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-info rounded-circle">
                            <i className="fas fa-file-excel" />
                          </div>
                          <span className="text">Reports</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-success rounded-circle">
                            <i className="fas fa-envelope" />
                          </div>
                          <span className="text">Emails</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-primary rounded-circle">
                            <i className="fas fa-file-invoice-dollar" />
                          </div>
                          <span className="text">Invoice</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-secondary rounded-circle">
                            <i className="fas fa-credit-card" />
                          </div>
                          <span className="text">Payments</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item topbar-user dropdown hidden-caret">
              <a
                className="dropdown-toggle profile-pic"
                data-bs-toggle="dropdown"
                href="#"
                aria-expanded="false"
              >
                <div className="avatar-sm">
                  <img
                    src={userProfile.avatarUrl}
                    alt="..."
                    className="avatar-img rounded-circle"
                  />
                </div>
                <span className="profile-username">
                  <span className="op-7">Hi,</span>
                  <span className="fw-bold">{userProfile.fullname}</span>
                </span>
              </a>
              <ul className="dropdown-menu dropdown-user animated fadeIn">
                <div className="dropdown-user-scroll scrollbar-outer">
                  <li>
                    <div className="user-box">
                      <div className="avatar-lg">
                        <img
                          src={userProfile.avatarUrl}
                          alt="image profile"
                          className="avatar-img rounded"
                        />
                      </div>
                      <div className="u-text">
                        <h4>{userProfile.username}</h4>
                        <p className="text-muted">{userProfile.email}</p>
                        <NavLink
                          to="/admin/profile"
                          className="btn btn-xs btn-secondary btn-sm"
                        >
                          View Profile
                        </NavLink>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-divider" />
                    <NavLink
                      className="dropdown-item"
                      style={{ background: "none", color: "black" }}
                      to="/admin/profile"
                    >
                      My Profile
                    </NavLink>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        removeDataTextStorage(TOKEN_AUTHOR);
                        removeDataTextStorage(USER_LOGIN);
                        navigate("/");
                        message.success("Logout success!");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </div>
  );
};

export default AdminHeader;
