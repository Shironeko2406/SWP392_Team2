import React from "react";
import "../../index.css";
import { Button, Flex } from "antd";

const MyHeader = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container">
        {/* Brand/logo */}
        <a className="navbar-brand" href="#">
          <i className="fas fa-code" /> Your Logo
        </a>
        {/* Toggler/collapsibe Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Navbar links */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* <Flex wrap gap="small">
          <Button type="primary" danger>
            Login
          </Button>
          <Button danger>Sign in</Button>
        </Flex> */}
      </div>
    </nav>
  );
};

export default MyHeader;
