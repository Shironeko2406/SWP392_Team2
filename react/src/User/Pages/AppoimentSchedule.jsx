import React, { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Typography, Card, Button, Modal, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetAppointmentListByUserIdActionAsync } from "../../Redux/Reducer/AppointmentReducer";
import { getDataJSONStorage, USER_LOGIN } from "../../Utils/UtilFuction";

const { Header, Content } = Layout;
const { Title } = Typography;

const AppointmentSchedule = () => {
  const { appointmentListByUserId } = useSelector(
    (state) => state.AppointmentReducer
  );
  console.log(appointmentListByUserId);
  const dispatch = useDispatch();
  const user = getDataJSONStorage(USER_LOGIN);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    const actionAsync = GetAppointmentListByUserIdActionAsync(user.UserId);
    dispatch(actionAsync);
  }, []);

  const handleCreateAppointment = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
  };

  const renderStatusTag = (status) => {
    switch (status) {
      case 0:
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">
            Pending...
          </Tag>
        );
      case 1:
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Accept
          </Tag>
        );
      case 2:
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Cancel
          </Tag>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 0 }}>
        <Title level={3}>Appointment Schedule</Title>
      </Header>
      <Content style={{ margin: "16px" }}>
        {appointmentListByUserId.map((appointment) => (
          <Card
            key={appointment.id}
            style={{ marginBottom: "20px" }}
            // actions={[
            //   <EditOutlined
            //     key="edit"
            //     onClick={() => setIsEditModalVisible(true)}
            //   />,
            //   <DeleteOutlined key="delete" onClick={() => {}} />,
            // ]}
          >
            <Card.Meta
              avatar={<Avatar src={appointment.tutorAvatarUrl} size="large" />}
              title={
                <div className="d-flex align-items-center">
                  <strong>{appointment.tutorUsername}</strong>
                  <div style={{ marginLeft: "8px" }}>
                    {renderStatusTag(appointment.status)}
                  </div>
                </div>
              }
              description={
                <>
                  <p>
                    <strong>Location:</strong> {appointment.address}
                  </p>
                  <p>
                    <strong>Appointment Time:</strong>{" "}
                    {new Date(appointment.appointmentTime).toLocaleString()}
                  </p>
                </>
              }
            />
          </Card>
        ))}
        <Modal
          title="Create Appointment"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          <p>Create Appointment Form</p>
        </Modal>
        <Modal
          title="Edit Appointment"
          visible={isEditModalVisible}
          onCancel={handleEditModalClose}
          footer={null}
        >
          <p>Edit Appointment Form</p>
        </Modal>
      </Content>
    </Layout>
  );
};

export default AppointmentSchedule;
