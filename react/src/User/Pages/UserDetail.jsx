// import React, { useEffect } from "react";
// import {
//   Avatar,
//   Button,
//   Card,
//   Descriptions,
//   Divider,
//   Layout,
//   Typography,
// } from "antd";
// import {
//   MailOutlined,
//   PhoneOutlined,
//   HomeOutlined,
//   UserOutlined,
//   ManOutlined,
//   WomanOutlined,
//   EditOutlined,
// } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { GetUserProfileActionAsync } from "../../Redux/Reducer/UserReducer";

// const { Header, Sider, Content } = Layout;
// const { Title } = Typography;

// const UserDetail = () => {
//   const { userProfile } = useSelector((state) => state.UserReducer);
//   const dispatch = useDispatch();
//   console.log(userProfile);

//   useEffect(() => {
//     const actionAsync = GetUserProfileActionAsync();
//     dispatch(actionAsync);
//   }, []);

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Header style={{ background: "#fff", padding: 0 }}>
//         <div className="d-flex justify-content-between align-items-center">
//           <Title level={3}>User Profile</Title>
//           <Button
//             type="primary"
//             shape="default"
//             icon={<EditOutlined />}
//             size="large"
//             style={{ margin: "0 16px" }}
//             onClick={""}
//           />
//         </div>
//       </Header>
//       <Content style={{ margin: " 16px", background: "#fff" }}>
//         <Card bordered={false}>
//           <div style={{ textAlign: "center" }}>
//             <Avatar
//               size={128}
//               src={userProfile?.avatarUrl}
//               icon={<UserOutlined />}
//             />
//           </div>
//           <Divider />
//           <Descriptions title="User Info" bordered column={1}>
//             <Descriptions.Item label="Name">
//               {userProfile?.username}
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">
//               <MailOutlined style={{ marginRight: 8 }} />
//               {userProfile?.email}
//             </Descriptions.Item>
//             <Descriptions.Item label="Phone">
//               <PhoneOutlined style={{ marginRight: 8 }} />
//               {userProfile?.phone}
//             </Descriptions.Item>
//             <Descriptions.Item label="Address">
//               <HomeOutlined style={{ marginRight: 8 }} />
//               {userProfile?.address}
//             </Descriptions.Item>
//             <Descriptions.Item label="Gender">
//               {userProfile.gender === 2 ? (
//                 <ManOutlined style={{ marginRight: 8 }} />
//               ) : (
//                 <WomanOutlined style={{ marginRight: 8 }} />
//               )}
//               {userProfile.gender === 2 ? "Male" : "Female"}
//             </Descriptions.Item>
//           </Descriptions>
//         </Card>
//       </Content>
//     </Layout>
//   );
// };

// export default UserDetail;

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Layout,
  Typography,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
  ManOutlined,
  WomanOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUserProfileActionAsync,
  UpdateUserProfileByIdActionAsync,
} from "../../Redux/Reducer/UserReducer";
import EditProfile from "../Component/Modal/EditProfile";

const { Header, Content } = Layout;
const { Title } = Typography;

const UserDetail = () => {
  const { userProfile } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const actionAsync = GetUserProfileActionAsync();
    dispatch(actionAsync);
  }, [dispatch]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (values) => {
    // Handle form submission, for example, dispatch an action to update user profile
    console.log("Updated values:", values);
    setIsModalVisible(false);
    const actionAsync = UpdateUserProfileByIdActionAsync(
      userProfile.accountId,
      values
    );
    dispatch(actionAsync);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 0 }}>
        <div className="d-flex justify-content-between align-items-center">
          <Title level={3}>User Profile</Title>
          <Button
            type="primary"
            shape="default"
            icon={<EditOutlined />}
            size="large"
            style={{ margin: "0 16px" }}
            onClick={showModal}
          />
        </div>
      </Header>
      <Content style={{ margin: " 16px", background: "#fff" }}>
        <Card bordered={false}>
          <div style={{ textAlign: "center" }}>
            <Avatar
              size={128}
              src={userProfile?.avatarUrl}
              icon={<UserOutlined />}
            />
          </div>
          <Divider />
          <Descriptions title="User Info" bordered column={1}>
            <Descriptions.Item label="Name">
              <UserOutlined style={{ marginRight: 8 }} />
              {userProfile?.username}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <MailOutlined style={{ marginRight: 8 }} />
              {userProfile?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              <PhoneOutlined style={{ marginRight: 8 }} />
              {userProfile?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              <HomeOutlined style={{ marginRight: 8 }} />
              {userProfile?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {userProfile.gender === 1 && (
                <>
                  <ManOutlined style={{ marginRight: 8 }} />
                  Male
                </>
              )}
              {userProfile.gender === 2 && (
                <>
                  <WomanOutlined style={{ marginRight: 8 }} />
                  Female
                </>
              )}
              {userProfile.gender === 3 && (
                <>
                  <UserOutlined style={{ marginRight: 8 }} />
                  Other
                </>
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
      <EditProfile
        visible={isModalVisible}
        onOk={handleEdit}
        onCancel={handleCloseModal}
        userProfile={userProfile}
      />
    </Layout>
  );
};

export default UserDetail;
