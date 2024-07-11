import React, { useState } from "react";
import { Modal, Card, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { resetViewTutorId } from "../../../Redux/Reducer/TutorReducer";

const ViewTutorAdmin = ({ visible, onClose, tutorId }) => {
  const { viewTutorId } = useSelector((state) => state.TutorReducer);

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(resetViewTutorId());
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
            src={viewTutorId.avatarUrl}
            icon={!viewTutorId.avatarUrl && <UserOutlined />}
            style={{ marginBottom: "20px" }}
          />
          <h2>{viewTutorId.fullname}</h2>
          <p>
            <strong>Email:</strong> {viewTutorId.email}
          </p>
          <p>
            <strong>Location:</strong> {viewTutorId.address}
          </p>
          <p>
            <strong>Phone:</strong> {viewTutorId.phone}
          </p>
          <p>
            <strong>Gender:</strong> {renderGender(viewTutorId.gender)}
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            {viewTutorId?.qualifications &&
            viewTutorId.qualifications.length > 0
              ? viewTutorId.qualifications
                  .map((qualification) => qualification.qualificationName)
                  .join(", ")
              : "No qualifications"}
          </p>
        </Card>
      </Modal>
    </div>
  );
};

export default ViewTutorAdmin;
