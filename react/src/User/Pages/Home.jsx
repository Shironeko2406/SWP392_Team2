import React from 'react'
import {
    UserOutlined,
    HomeOutlined,
    ScheduleOutlined,
    SettingOutlined,
  } from "@ant-design/icons";
import MyHeader from '../Component/MyHeader';
import Footer from '../Component/Footer';
import { Menu } from "antd";
import { Outlet, useNavigate } from 'react-router-dom';

const items = [
    {
      key: "",
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      key: "user-detail",
      label: "User Profile",
      icon: <UserOutlined />,
      // children: [
      //   {
      //     key: "5",
      //     label: "Option 5",
      //   },
      //   {
      //     key: "6",
      //     label: "Option 6",
      //   },
      //   {
      //     key: "sub3",
      //     label: "Submenu",
      //     children: [
      //       {
      //         key: "7",
      //         label: "Option 7",
      //       },
      //       {
      //         key: "8",
      //         label: "Option 8",
      //       },
      //     ],
      //   },
      // ],
    },
    
    {
      type: "divider",
    },
    {
      key: "appointment-schedule",
      label: "Appointment Schedule",
      icon: <ScheduleOutlined />,
      // children: [
      //   {
      //     key: "9",
      //     label: "Option 9",
      //   },
      //   {
      //     key: "10",
      //     label: "Option 10",
      //   },
      //   {
      //     key: "11",
      //     label: "Option 11",
      //   },
      //   {
      //     key: "12",
      //     label: "Option 12",
      //   },
      // ],
    },
    {
      key: "logout",
      label: "Logout",
      icon: <SettingOutlined />,
      danger: true,
    },
  ];

const Home = () => {

    const navigate = useNavigate();

    const onClick = (e) => {
        if (e.key === 'logout') {
          // Handle logout logic
          console.log('Logging out...');
          return;
        }
        navigate(e.key);
      };


  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MyHeader />
      <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', flex: 1 }}>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['sub1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
        <div style={{ marginLeft: '20px', flex: 1 }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home