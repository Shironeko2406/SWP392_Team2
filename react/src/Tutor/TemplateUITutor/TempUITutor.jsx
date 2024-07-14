import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Space,
  Breadcrumb,
  Layout,
  Menu,
  Input,
  Badge,
  theme,
  message,
} from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import "../../index.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { removeDataTextStorage, TOKEN_AUTHOR, USER_LOGIN } from "../../Utils/UtilFuction";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const items1 = [
  { key: "Home", label: <NavLink to="/tutor">Home</NavLink> },
  {
    key: "appointment-schedule",
    label: (
      <NavLink to="/tutor/appointment-schedule">Appointment-Schedule</NavLink>
    ),
  },
  { key: "review", label: <NavLink to="/">Review</NavLink> },
];


const TempUITutor = () => {
  const navigate = useNavigate()
  const handleSearch = (value) => {
    message.info(`Searching for: ${value}`);
  };

  const menu = (
    <Menu>
      <Menu.Item key="wait">Awaiting review</Menu.Item>
      <Menu.Item key="public">Has been made public</Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item
        key="profile"
        onClick={() => navigate("/tutor/tutor-profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="logout"
        style={{ color: "red" }}
        onClick={() => {
          removeDataTextStorage(TOKEN_AUTHOR);
          removeDataTextStorage(USER_LOGIN);
          navigate("/");
          message.success("Logout success!");
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="header-content"
          style={{
            padding: "0 50px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="logo-user">
            <img
              src="https://c8.alamy.com/comp/2E2PJKR/vector-logo-of-a-tutor-educational-courses-2E2PJKR.jpg"
              alt="Logo"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{
              flex: 1,
              justifyContent: "center",
              display: "flex",
            }}
          />
          <div className="header-right d-flex align-items-center">
            <Search
              placeholder="Search..."
              onSearch={handleSearch}
              style={{ width: 200, marginRight: "1rem" }}
            />
            <Dropdown overlay={menu} className="me-2">
              <Button>
                <Space>
                  Filter posts
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Dropdown overlay={userMenu}>
              <Avatar
                style={{ backgroundColor: "#003366", marginLeft: "1rem" }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Content
            style={{
              padding: "0 24px",
              minHeight: 450,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default TempUITutor;
