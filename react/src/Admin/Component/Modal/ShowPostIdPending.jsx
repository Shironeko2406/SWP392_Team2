import React, { useState } from "react";
import { Modal, Button, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPostByIdAction,
  updatePostRequestStatusActionAsync,
} from "../../../Redux/Reducer/PostRequestReducer";

const ShowPostIdPending = ({ visible, onClose, postId }) => {
  const { postById } = useSelector((state) => state.PostRequestReducer);
  const dispatch = useDispatch();

  const handleApprove = () => {
    const status = 1;
    Modal.confirm({
      title: "Are you sure approve this post?",
      onOk: () => {
        const actionAsync = updatePostRequestStatusActionAsync(postId, status);
        dispatch(actionAsync);
        onClose();
      },
    });
  };

  const handleDelete = () => {
    const status = 2;
    Modal.confirm({
      title: "Are you sure unable this post?",
      onOk: () => {
        const actionAsync = updatePostRequestStatusActionAsync(postId, status);
        dispatch(actionAsync);
        onClose();
      },
    });
  };

  const handleCancel = () => {
    dispatch(resetPostByIdAction());
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
        title={"View Post"}
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="approve" type="primary" onClick={handleApprove}>
            Approve Post
          </Button>,
          <Button key="unable" danger onClick={handleDelete}>
            Unable
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        width={800}
      >
        <Card style={{ marginBottom: "20px" }}>
          <Card.Meta
            avatar={<Avatar src={postById.avatarUrl} />}
            title={postById.createdByUsername}
            description={new Date(postById.createdDate).toLocaleString()}
          />
          <div style={{ marginTop: "20px" }}>
            <p>{postById.description}</p>
            <p>
              <strong>Location:</strong> {postById.location}
            </p>
            <p>
              <strong>Schedule:</strong> {postById.schedule}
            </p>
            <p>
              <strong>Preferred Time:</strong> {postById.preferredTime}
            </p>
            <p>
              <strong>Gender:</strong> {renderGender(postById.gender)}
            </p>
            <p>
              <strong>Request Skill:</strong> {postById.requestSkill}
            </p>
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default ShowPostIdPending;
