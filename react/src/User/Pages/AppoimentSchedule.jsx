import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Layout, Typography, Card, Button, Modal } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const appointments = [
  {
    id: 1,
    userAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-NviIBQL9BxKSmvGrdvpeKTMsiwnuHA24A&s",
    patientName: "John Doe",
    appointmentTime: "2024-05-26 10:00 AM",
    doctorName: "Dr. Smith",
    status: "Confirmed",
  },
  {
    id: 2,
    userAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPa4v71EAqh6TvoLPHeO2T92QpHr44h2jmHA&s",
    patientName: "Jane Smith",
    appointmentTime: "2024-05-26 11:00 AM",
    doctorName: "Dr. Adams",
    status: "Pending",
  },
  {
    id: 3,
    userAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq1_NUx_3Q5UK_XadfRgMqo_7X4dILRtBCSQ&s",
    patientName: "Alice Johnson",
    appointmentTime: "2024-05-26 01:00 PM",
    doctorName: "Dr. Lee",
    status: "Completed",
  },
];

const AppointmentSchedule = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleCreateAppointment = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 0 }}>
        <div className="d-flex justify-content-between align-items-center">
          <Title level={3} style={{ margin: "16px" }}>
            Appointment Schedule
          </Title>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            style={{ margin: "16px" }}
            onClick={handleCreateAppointment}
          />
        </div>
      </Header>
      <Content style={{ margin: "16px" }}>
        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            style={{ marginBottom: "20px" }}
            actions={[
              <EditOutlined key="edit" onClick={() => setIsEditModalVisible(true)} />,
              <DeleteOutlined key="delete" onClick={() => {}} />,
            ]}
          >
            <Card.Meta
              avatar={<Avatar src={appointment.userAvatar} size="large" />}
              title={
                <div>
                  <strong>{appointment.patientName}</strong>
                  <div className="text-muted" style={{ fontSize: "12px" }}>
                    {appointment.appointmentTime}
                  </div>
                </div>
              }
              description={
                <>
                  <p>Doctor: {appointment.doctorName}</p>
                  <p>Status: {appointment.status}</p>
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
