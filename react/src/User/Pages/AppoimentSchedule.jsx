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
import { Avatar, Layout, Typography, Card, Button, Modal, Tag, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetAppointmentListByUserIdActionAsync } from "../../Redux/Reducer/AppointmentReducer";
import { getDataJSONStorage, USER_LOGIN } from "../../Utils/UtilFuction";

const { Header, Content } = Layout;
const { Option } = Select;
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
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    const actionAsync = GetAppointmentListByUserIdActionAsync(user.UserId);
    dispatch(actionAsync);
  }, []);

  const handleSortChange = (value) => {
    setSortOption(value);
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
  
  const sortedAppointments = [...appointmentListByUserId].sort((a, b) => {
    switch (sortOption) {
      case "nearest":
        return new Date(a.appointmentTime) - new Date(b.appointmentTime);
      case "furthest":
        return new Date(b.appointmentTime) - new Date(a.appointmentTime);
      case "pending":
        return a.status === 0 ? -1 : b.status === 0 ? 1 : 0;
      case "approve":
        return a.status === 1 ? -1 : b.status === 1 ? 1 : 0;
      case "cancel":
        return a.status === 2 ? -1 : b.status === 2 ? 1 : 0;
      default:
        return 0;
    }
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="d-flex justify-content-between align-items-center">
          <h3>Appointment Schedule</h3>
          <Select
            defaultValue="Sort by"
            style={{ width: 200, marginLeft: 16 }}
            onChange={handleSortChange}
          >
            <Option value="all">Show all</Option>
            <Option value="nearest">Nearest appointment</Option>
            <Option value="furthest">Furthest appointment</Option>
            <Option value="pending">Appointment is pending</Option>
            <Option value="approve">Appointment was approve</Option>
            <Option value="cancel">Appointment was cancel</Option>
          </Select>
        </div>
      </Header>
      <Content style={{ margin: "16px" }}>
        {sortedAppointments.map((appointment) => (
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
