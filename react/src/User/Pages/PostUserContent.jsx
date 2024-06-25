import React, { useEffect, useState } from "react";
import "../../index.css";
import {
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Layout, Typography, Card, Button, Modal } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  DeletePostByIdActionAsync,
  GetPostListUserLoginActionAsync,
  getPostRequestByIdActionAsync,
} from "../../Redux/Reducer/PostRequestReducer";
import CreatePost from "../Component/Modal/CreatePost";
import EditPost from "../Component/Modal/EditPost";

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
  const [editPostId, setEditPostId] = useState(null);

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

  const handleCreatePost = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    setEditPostId(null);
  };

  return (
    <Layout>
      <Header style={{ background: "#fff", padding: 0 }}>
        <div className="d-flex justify-content-between align-items-center">
          <Title level={3} style={{ margin: "16px" }}>
            Post Content
          </Title>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            style={{ margin: "16px" }}
            onClick={handleCreatePost}
          />
        </div>
      </Header>
      <Content style={{ margin: "16px" }}>
        <div className="container mt-3">
          {postListUserLogin
            .filter((post) => post.status !== 3)
            .map((post) => (
              <Card
                key={post.postId}
                style={{ marginBottom: "20px" }}
                actions={[
                  <Badge count={1}>
                    <MailOutlined key="mail" />
                  </Badge>,
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
                      <strong>Nahida</strong>
                      <div className="text-muted" style={{ fontSize: "12px" }}>
                        {new Date(post.createdDate).toLocaleString()}
                      </div>
                    </div>
                  }
                  description={<p>{post.description}</p>}
                />
              </Card>
            ))}
          <EditPost
            visible={isEditModalVisible}
            onClose={handleEditModalClose}
            postId={editPostId}
          ></EditPost>
          <CreatePost
            visible={isModalVisible}
            onClose={handleModalClose}
          ></CreatePost>
        </div>
      </Content>
    </Layout>
  );
};

export default PostUserContent;
