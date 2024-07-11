import React, { useState } from "react";
import { Modal, Card, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { resetViewUserById } from "../../../Redux/Reducer/UserReducer";


const ViewUserAdmin = ({ visible, onClose, userId }) => {
  const { viewUserById } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(resetViewUserById());
    onClose();
  };

  const renderGender = (gender) => {
    switch (gender) {
      case 0:
        return "Other";
      case 1:
        return "Male";
      case 2:
        return "Female";
      default:
        return "Unknown";
    }
  };

  return (
    <div>
      <Modal
        title="Tutor Profile"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <Card style={{ textAlign: "center" }}>
          <Avatar
            size={100}
            src={viewUserById.avatarUrl}
            icon={!viewUserById.avatarUrl && <UserOutlined />}
            style={{ marginBottom: "20px" }}
          />
          <h2>{viewUserById.fullname}</h2>
          <p>
            <strong>Email:</strong> {viewUserById.email}
          </p>
          <p>
            <strong>Location:</strong> {viewUserById.address}
          </p>
          <p>
            <strong>Phone:</strong> {viewUserById.phone}
          </p>
          <p>
            <strong>Gender:</strong> {renderGender(viewUserById.gender)}
          </p>
        </Card>
      </Modal>
    </div>
  );
};

export default ViewUserAdmin;
