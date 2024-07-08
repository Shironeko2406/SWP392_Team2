// import React, { useEffect, useState } from "react";
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
//   BookOutlined,
//   PlusOutlined,
// } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   GetTutorProfileActionAsync,
//   UpdateTutorProfileByIdActionAsync,
// } from "../../Redux/Reducer/TutorReducer";
// import EditProfileTutor from "../Component/Modal/EditProfileTutor";

// const { Header, Content } = Layout;
// const { Title } = Typography;

// const TutorProfile = () => {
//   const { tutorProfile } = useSelector((state) => state.TutorReducer);
//   const dispatch = useDispatch();
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   useEffect(() => {
//     const actionAsync = GetTutorProfileActionAsync();
//     dispatch(actionAsync);
//   }, []);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleEdit = (values) => {
//     // Handle form submission, for example, dispatch an action to update user profile
//     console.log("Updated values:", values);
//     setIsModalVisible(false);
//     const actionAsync = UpdateTutorProfileByIdActionAsync(
//       tutorProfile.tutorId,
//       values
//     );
//     dispatch(actionAsync);
//   };

//   const handleCloseModal = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Header style={{ background: "#fff", padding: 0 }}>
//         <div className="d-flex justify-content-between align-items-center mt--2">
//           <Title level={3}>User Profile</Title>
//           <div>
//             <Button
//               type="primary"
//               shape="default"
//               icon={<EditOutlined />}
//               size="large"
//               className="me-3"
//               onClick={showModal}
//             />
//             <Button
//               style={{
//                 backgroundColor: "#52c41a",
//                 borderColor: "#52c41a",
//                 color: "#fff",
//               }}
//               type="primary"
//               icon={<PlusOutlined />}
//               size="large"
//               onClick={""}
//             >
//               Add Qualification
//             </Button>
//           </div>
//         </div>
//       </Header>
//       <Content style={{ margin: " 16px", background: "#fff" }}>
//         <Card bordered={false}>
//           <div style={{ textAlign: "center" }}>
//             <Avatar
//               size={128}
//               src={tutorProfile?.avatarUrl}
//               icon={<UserOutlined />}
//             />
//           </div>
//           <Divider />
//           <Descriptions title="User Info" bordered column={1}>
//             <Descriptions.Item label="Name">
//               <UserOutlined style={{ marginRight: 8 }} />
//               {tutorProfile?.fullname}
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">
//               <MailOutlined style={{ marginRight: 8 }} />
//               {tutorProfile?.email}
//             </Descriptions.Item>
//             <Descriptions.Item label="Phone">
//               <PhoneOutlined style={{ marginRight: 8 }} />
//               {tutorProfile?.phone}
//             </Descriptions.Item>
//             <Descriptions.Item label="Address">
//               <HomeOutlined style={{ marginRight: 8 }} />
//               {tutorProfile?.address}
//             </Descriptions.Item>
//             <Descriptions.Item label="Gender">
//               {tutorProfile.gender === 1 && (
//                 <>
//                   <ManOutlined style={{ marginRight: 8 }} />
//                   Male
//                 </>
//               )}
//               {tutorProfile.gender === 2 && (
//                 <>
//                   <WomanOutlined style={{ marginRight: 8 }} />
//                   Female
//                 </>
//               )}
//               {tutorProfile.gender === 3 && (
//                 <>
//                   <UserOutlined style={{ marginRight: 8 }} />
//                   Other
//                 </>
//               )}
//             </Descriptions.Item>
//             <Descriptions.Item label="Qualifications">
//               <BookOutlined style={{ marginRight: 8 }} />
//               {tutorProfile?.qualifications &&
//               tutorProfile.qualifications.length > 0
//                 ? tutorProfile.qualifications
//                     .map((qualification) => qualification.qualificationName)
//                     .join(", ")
//                 : "No qualifications"}
//             </Descriptions.Item>
//           </Descriptions>
//         </Card>
//       </Content>
//       <EditProfileTutor
//         visible={isModalVisible}
//         onOk={handleEdit}
//         onCancel={handleCloseModal}
//         tutorProfile={tutorProfile}
//       ></EditProfileTutor>
//     </Layout>
//   );
// };

// export default TutorProfile;


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
  BookOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTutorProfileActionAsync,
  UpdateTutorProfileByIdActionAsync,
} from "../../Redux/Reducer/TutorReducer";
import EditProfileTutor from "../Component/Modal/EditProfileTutor";
import AddQualification from "../Component/Modal/AddQualification";
import { getCurrentDateTime } from "../../Utils/UtilFuction";
import { AddQualificationActionAsync } from "../../Redux/Reducer/QualificationReducer";

const { Header, Content } = Layout;
const { Title } = Typography;

const TutorProfile = () => {
  const { tutorProfile } = useSelector((state) => state.TutorReducer);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddQualificationVisible, setIsAddQualificationVisible] = useState(false);

  useEffect(() => {
    const actionAsync = GetTutorProfileActionAsync();
    dispatch(actionAsync);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showAddQualificationModal = () => {
    setIsAddQualificationVisible(true);
  };

  const handleEdit = (values) => {
    // Handle form submission, for example, dispatch an action to update user profile
    console.log("Updated values:", values);
    setIsModalVisible(false);
    const actionAsync = UpdateTutorProfileByIdActionAsync(
      tutorProfile.tutorId,
      values
    );
    dispatch(actionAsync);
  };

  const handleAddQualification = (values) => {
    const currentTime = getCurrentDateTime();
    setIsAddQualificationVisible(false);
    const valueToSend = {
      qualificationType: 1,
      qualificationName: values.qualification,
      institutionName: "education",
      yearObtained: currentTime,
      skillId: 3,
      proficiencyId: 1
    }
    console.log(valueToSend)
    // Dispatch action to add qualification to the profile
    const actionAsync = AddQualificationActionAsync(tutorProfile.tutorId, valueToSend);
    dispatch(actionAsync);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseAddQualificationModal = () => {
    setIsAddQualificationVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 0 }}>
        <div className="d-flex justify-content-between align-items-center mt--2">
          <Title level={3}>User Profile</Title>
          <div>
            <Button
              type="primary"
              shape="default"
              icon={<EditOutlined />}
              size="large"
              className="me-3"
              onClick={showModal}
            />
            <Button
              style={{
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
                color: "#fff",
              }}
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={showAddQualificationModal}
            >
              Add Qualification
            </Button>
          </div>
        </div>
      </Header>
      <Content style={{ margin: " 16px", background: "#fff" }}>
        <Card bordered={false}>
          <div style={{ textAlign: "center" }}>
            <Avatar
              size={128}
              src={tutorProfile?.avatarUrl}
              icon={<UserOutlined />}
            />
          </div>
          <Divider />
          <Descriptions title="User Info" bordered column={1}>
            <Descriptions.Item label="Name">
              <UserOutlined style={{ marginRight: 8 }} />
              {tutorProfile?.fullname}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <MailOutlined style={{ marginRight: 8 }} />
              {tutorProfile?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              <PhoneOutlined style={{ marginRight: 8 }} />
              {tutorProfile?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              <HomeOutlined style={{ marginRight: 8 }} />
              {tutorProfile?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {tutorProfile.gender === 1 && (
                <>
                  <ManOutlined style={{ marginRight: 8 }} />
                  Male
                </>
              )}
              {tutorProfile.gender === 2 && (
                <>
                  <WomanOutlined style={{ marginRight: 8 }} />
                  Female
                </>
              )}
              {tutorProfile.gender === 3 && (
                <>
                  <UserOutlined style={{ marginRight: 8 }} />
                  Other
                </>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Qualifications">
              <BookOutlined style={{ marginRight: 8 }} />
              {tutorProfile?.qualifications &&
              tutorProfile.qualifications.length > 0
                ? tutorProfile.qualifications
                    .map((qualification) => qualification.qualificationName)
                    .join(", ")
                : "No qualifications"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
      <EditProfileTutor
        visible={isModalVisible}
        onOk={handleEdit}
        onCancel={handleCloseModal}
        tutorProfile={tutorProfile}
      ></EditProfileTutor>
      <AddQualification
        visible={isAddQualificationVisible}
        onCreate={handleAddQualification}
        onCancel={handleCloseAddQualificationModal}
      />
    </Layout>
  );
};

export default TutorProfile;
