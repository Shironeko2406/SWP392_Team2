import React, { useEffect, useState } from "react";
import "../../index.css";
import {
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Layout,
  Typography,
  Card,
  Button,
  Modal,
  Tag,
  Dropdown,
  Menu,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  DeletePostByIdActionAsync,
  GetPostListUserLoginActionAsync,
  getPostRequestByIdActionAsync,
} from "../../Redux/Reducer/PostRequestReducer";
import CreatePost from "../Component/Modal/CreatePost";
import EditPost from "../Component/Modal/EditPost";
import {
  TOKEN_AUTHOR,
  USER_LOGIN,
  getDataJSONStorage,
  getDataTextStorage,
} from "../../Utils/UtilFuction";
import ViewTutor from "../Component/Modal/ViewTutor";
import { ViewTutorByIdActionAsync } from "../../Redux/Reducer/TutorReducer";

const { Header, Content } = Layout;
const { Title } = Typography;

const PostUserContent = () => {
  const { tokenUser } = useSelector((state) => state.UserReducer);
  const { postListUserLogin } = useSelector(
    (state) => state.PostRequestReducer
  );

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isModalViewTutorVisible, setIsModalViewTutorVisible] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [viewTutorId, setViewTutorId] = useState(null);

  useEffect(() => {
    const actionAsync = GetPostListUserLoginActionAsync();
    dispatch(actionAsync);
  }, [dispatch]);

  const handleDeletePostById = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this post?",
      onOk: () => {
        const actionAsync = DeletePostByIdActionAsync(id);
        dispatch(actionAsync);
      },
    });
  };

  const handleGetPostById = (id) => {
    setEditPostId(id);
    const actionAsync = getPostRequestByIdActionAsync(id);
    dispatch(actionAsync);
    setIsEditModalVisible(true);
  };

  const handleViewTutorById = (id) => {
    setViewTutorId(id);
    const actionAsync = ViewTutorByIdActionAsync(id);
    dispatch(actionAsync);
    setIsModalViewTutorVisible(true);
  };

  const handleCreatePost = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalViewTutorClose = () => {
    setIsModalViewTutorVisible(false);
    setViewTutorId(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    setEditPostId(null);
  };

  const renderGender = (gender) => {
    if (gender === 1) return "Male";
    if (gender === 2) return "Female";
    return "Unknown";
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
            Public
          </Tag>
        );
      case 3:
        return (
          <Tag icon={<MinusCircleOutlined />} color="default">
            Close
          </Tag>
        );
      default:
        return null;
    }
  };

  const createApplyMenu = (applies) => (
    <Menu>
      {applies.map((apply, index) => (
        <Menu.Item
          key={index}
          style={{ borderBottom: "1px solid #e0e0e0", padding: "20px" }}
        >
          <div>
            <p>
              <strong>Name:</strong> {apply.fullname}
            </p>
            <Button
              type="primary"
              size="small"
              className="me-2"
              onClick={() => handleViewTutorById(apply.tutorId)}
            >
              View Profile
            </Button>

            <Button type="primary" size="small">
              Create Appointment
            </Button>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Layout>
      <Header style={{ background: "#fff", padding: 0 }}>
        <div className="d-flex justify-content-between align-items-center">
          <Title level={3}>Post Content</Title>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            style={{ margin: "0 16px" }}
            onClick={handleCreatePost}
          />
        </div>
      </Header>
      <Content style={{ margin: "16px" }}>
        <div>
          {postListUserLogin
            .filter((post) => post.status !== 3)
            .map((post) => (
              <Card
                key={post.postId}
                style={{ marginBottom: "20px" }}
                actions={[
                  // <Badge count={post.applies.length}>
                  //   <MailOutlined key="mail" />
                  // </Badge>,
                  <Dropdown
                    overlay={createApplyMenu(post.applies)}
                    trigger={["hover"]}
                  >
                    <Badge count={post.applies.length}>
                      <MailOutlined key="mail" />
                    </Badge>
                  </Dropdown>,
                  <EditOutlined
                    key="edit"
                    onClick={() => handleGetPostById(post.postId)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDeletePostById(post.postId)}
                  />,
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNVRKFKJYhupjDCThl0VkE0EdEbhoW1-U7hg&s"
                      alt="User Avatar"
                      size="large"
                    />
                  }
                  title={
                    <div>
                      <div className="d-flex align-items-center">
                        <strong>{post.createdByUsername}</strong>
                        <div style={{ marginLeft: "8px" }}>
                          {renderStatusTag(post.status)}
                        </div>
                      </div>
                      <div className="text-muted" style={{ fontSize: "12px" }}>
                        {new Date(post.createdDate).toLocaleString()}
                      </div>
                    </div>
                  }
                  description={
                    <div>
                      <p>{post.description}</p>
                      <p>
                        <strong>Location:</strong> {post.location}
                      </p>
                      <p>
                        <strong>Schedule:</strong> {post.schedule}
                      </p>
                      <p>
                        <strong>Preferred Time:</strong> {post.preferredTime}
                      </p>
                      <p>
                        <strong>Gender:</strong> {renderGender(post.gender)}
                      </p>
                      <p>
                        <strong>Request Skill:</strong> {post.requestSkill}
                      </p>
                    </div>
                  }
                />
              </Card>
            ))}
          <EditPost
            visible={isEditModalVisible}
            onClose={handleEditModalClose}
            postId={editPostId}
          />
          <CreatePost visible={isModalVisible} onClose={handleModalClose} />
          <ViewTutor
            visible={isModalViewTutorVisible}
            onClose={handleModalViewTutorClose}
            tutorId={viewTutorId}
          ></ViewTutor>
        </div>
      </Content>
    </Layout>
  );
};

export default PostUserContent;
