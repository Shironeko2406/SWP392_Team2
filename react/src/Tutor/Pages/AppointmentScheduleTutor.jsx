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
import {
  ConfirmAppointmentActionAsync,
  GetAppointmentListByTutorIdActionAsync,
} from "../../Redux/Reducer/AppointmentReducer";
import { getDataJSONStorage, USER_LOGIN } from "../../Utils/UtilFuction";

const { Header, Content } = Layout;
const { Title } = Typography;

const AppointmentScheduleTutor = () => {
  const { appointmentListByTutorId } = useSelector(
    (state) => state.AppointmentReducer
  );
  console.log(appointmentListByTutorId);
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    const actionAsync = GetAppointmentListByTutorIdActionAsync();
    dispatch(actionAsync);
  }, []);

  const handleConfirmAppointment = (tutorId, appointmentId, isConfirmed) => {
    Modal.confirm({
      title: "Are you sure?",
      onOk: () => {
        const actionAsync = ConfirmAppointmentActionAsync(
          tutorId,
          appointmentId,
          isConfirmed
        );
        dispatch(actionAsync);
      },
    });
    console.log(tutorId, appointmentId, isConfirmed);
  };

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
        {appointmentListByTutorId.map((appointment) => (
          <Card
            key={appointment.appointmentId}
            style={{ marginBottom: "20px" }}
            actions={[
              <EditOutlined
                key="confirm"
                onClick={() =>
                  handleConfirmAppointment(
                    appointment.tutorId,
                    appointment.appointmentId,
                    true
                  )
                }
              />,
              <CloseCircleOutlined
                key="cancel"
                onClick={() =>
                  handleConfirmAppointment(
                    appointment.tutorId,
                    appointment.appointmentId,
                    false
                  )
                }
              />,
            ]}
          >
            <Card.Meta
              avatar={
                <Avatar src={appointment.accountAvatarUrl} size="large" />
              }
              title={
                <div className="d-flex align-items-center">
                  <strong>{appointment.accountUsername}</strong>
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

export default AppointmentScheduleTutor;
