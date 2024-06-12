import React from "react";
import {
  Avatar,
  Card,
  Descriptions,
  Divider,
  Layout,
  Menu,
  Typography,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  BookOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  address: "123 Main Street, Springfield, USA",
  avatar:
    "https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/183241/Originals/nahida%201.png",
  degree: "Ielts 7.0, JLPT N2",
  gender: "Male",
};

// const items = [
//   {
//     key: '1',
//     icon: <UserOutlined />,
//     label: 'Profile',
//   },
//   {
//     key: '2',
//     icon: <SettingOutlined />,
//     label: 'Settings',
//   },
// ];

const UserDetail = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Sider>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider> */}
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Title level={3} style={{ margin: "16px" }}>
            User Profile
          </Title>
        </Header>
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          <Card bordered={false}>
            <div style={{ textAlign: "center" }}>
              <Avatar size={128} src={user.avatar} icon={<UserOutlined />} />
            </div>
            <Divider />
            <Descriptions title="User Info" bordered column={1}>
              <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
              <Descriptions.Item label="Email">
                <MailOutlined style={{ marginRight: 8 }} />
                {user.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined style={{ marginRight: 8 }} />
                {user.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <HomeOutlined style={{ marginRight: 8 }} />
                {user.address}
              </Descriptions.Item>
              <Descriptions.Item label="Degree">
                <BookOutlined style={{ marginRight: 8 }} />
                {user.degree}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {user.gender === "Male" ? <ManOutlined style={{ marginRight: 8 }} /> : <WomanOutlined style={{ marginRight: 8 }} />}
                {user.gender}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDetail;
