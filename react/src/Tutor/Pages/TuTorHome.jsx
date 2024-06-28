import React, { useEffect, useState } from "react";
import {
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SyncOutlined,
  CheckCircleOutlined,
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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletePostByIdActionAsync,
  GetPostListUserLoginActionAsync,
  getPostRequestByIdActionAsync,
} from "../../Redux/Reducer/PostRequestReducer";

const { Header, Content } = Layout;
const { Title } = Typography;

const TuTorHome = () => {
  const { postListUserLogin } = useSelector(
    (state) => state.PostRequestReducer
  );

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  // useEffect(() => {
  //   dispatch(GetPostListUserLoginActionAsync());
  // }, [dispatch]);

  const handleDeletePostById = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this post?",
      onOk: () => dispatch(DeletePostByIdActionAsync(id)),
    });
  };

  const handleGetPostById = (id) => {
    setEditPostId(id);
    dispatch(getPostRequestByIdActionAsync(id));
    setIsEditModalVisible(true);
  };

  const renderGender = (gender) =>
    gender === 1 ? "Male" : gender === 2 ? "Female" : "Unknown";

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
                  <Badge count={post.applies.length} key="mail">
                    <MailOutlined />
                  </Badge>,
                  <EditOutlined
                    key="edit"
                  />,
                  <DeleteOutlined
                    key="delete"
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
                    <div className="d-flex align-items-center">
                      <strong>Nahida</strong>
                      <div style={{ marginLeft: "8px" }}>
                        {renderStatusTag(post.status)}
                      </div>
                    </div>
                  }
                  description={
                    <div>
                      <p className="text-muted" style={{ fontSize: "12px" }}>
                        {new Date(post.createdDate).toLocaleString()}
                      </p>
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
        </div>
      </Content>
    </Layout>
  );
};

export default TuTorHome;
