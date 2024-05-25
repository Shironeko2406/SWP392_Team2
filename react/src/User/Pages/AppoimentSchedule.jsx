import React from "react";
import {DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { Layout, Typography } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const appointments = [
  {
    id: 1,
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-NviIBQL9BxKSmvGrdvpeKTMsiwnuHA24A&s",
    patientName: "John Doe",
    appointmentTime: "2024-05-26 10:00 AM",
    doctorName: "Dr. Smith",
    status: "Confirmed",
  },
  {
    id: 2,
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPa4v71EAqh6TvoLPHeO2T92QpHr44h2jmHA&s",
    patientName: "Jane Smith",
    appointmentTime: "2024-05-26 11:00 AM",
    doctorName: "Dr. Adams",
    status: "Pending",
  },
  {
    id: 3,
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq1_NUx_3Q5UK_XadfRgMqo_7X4dILRtBCSQ&s",
    patientName: "Alice Johnson",
    appointmentTime: "2024-05-26 01:00 PM",
    doctorName: "Dr. Lee",
    status: "Completed",
  },
];

const AppointmentSchedule = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Title level={3} style={{ margin: "16px" }}>
            Appointment Schedule
          </Title>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div className="container mt-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="card mb-3">
                <div className="card-header d-flex align-items-center">
                  <img
                    src={appointment.userAvatar}
                    alt="User Avatar"
                    className="rounded-circle me-2"
                    style={{ width: "40px", height: "40px" }}
                  />

                  <div>
                    <strong style={{ fontSize: "16px" }}>
                      {appointment.patientName}
                    </strong>
                  </div>
                </div>

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="card-text">
                        Appointment Time: {appointment.appointmentTime}
                      </p>
                      <p className="card-text">
                        Doctor: {appointment.doctorName}
                      </p>
                      <p className="card-text">Status: {appointment.status}</p>
                    </div>
                    <div>
                      <button
                        className="btn btn-success me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editAppointmentModal"
                      >
                        <UserAddOutlined />
                      </button>
                      <button className="btn btn-danger">
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppointmentSchedule;
