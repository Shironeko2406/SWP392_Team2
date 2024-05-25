import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  ScheduleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import HomeUser from "./User/Pages/HomeUser";

import MyHeader from "../Component/MyHeader";
import { Footer } from "antd/es/layout/layout";

const items = [
  {
    key: "sub1",
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    key: "sub2",
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
    key: "sub3",
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
    key: "sub4",
    label: "Logout",
    icon: <SettingOutlined />,
    danger: true,
  },
];

const HomeUser = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <MyHeader></MyHeader>
      <div style={{ display: "flex", flexDirection: "row", height: "auto" }}>
        <Menu
          onClick={onClick}
          style={{
            width: 256,
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
        <div style={{ marginLeft: "20px", flex: 1 }}></div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeUser;
