import React, { useEffect, useState } from "react";
import {
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  UserSwitchOutlined,
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
  GetPostListActionAsync,
  GetPostListUserLoginActionAsync,
  getPostRequestByIdActionAsync,
} from "../../Redux/Reducer/PostRequestReducer";
import { getDataJSONStorage, USER_LOGIN } from "../../Utils/UtilFuction";
import { ApplyPostRequestActionAsync } from "../../Redux/Reducer/ApplyReducer";
import { useOutletContext } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

const TuTorHome = () => {
  const { postList } = useSelector((state) => state.PostRequestReducer);

  const [searchTerm, sortCreatedDate] = useOutletContext();


  const dispatch = useDispatch();

  const filteredPosts = postList
  .filter((post) => post.description.includes(searchTerm))
  .sort((a, b) => {
    if (sortCreatedDate === "newest") {
      return new Date(b.createdDate) - new Date(a.createdDate);
    } else if (sortCreatedDate === "oldest") {
      return new Date(a.createdDate) - new Date(b.createdDate);
    }
    return 0; // No sorting if sortOrder is null
  });


  useEffect(() => {
    dispatch(GetPostListActionAsync());
  }, [dispatch]);

  const handleApply = (postId) => {
    const tutorId = getDataJSONStorage(USER_LOGIN);
    const dataApply = {
      postId: postId,
      tutorId: tutorId.UserId,
      status: 0,
    };
    const actionAsync = ApplyPostRequestActionAsync(
      tutorId.UserId,
      postId,
      dataApply
    );
    dispatch(actionAsync);
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
        <Title level={3}>Home Page</Title>
      </Header>
      <Content style={{ margin: "16px" }}>
        <div>
          {filteredPosts
            .filter((post) => post.status !== 3 && post.status !== 0 && post.status !== 2)
            .map((post) => (
              <Card
                key={post.postId}
                style={{ marginBottom: "20px" }}
                actions={[
                  <UserSwitchOutlined
                    key="apply"
                    title="Apply"
                    onClick={() => handleApply(post.postId)}
                  />,
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      src={post.avatarUrl}
                      alt="User Avatar"
                      size="large"
                    />
                  }
                  title={
                    <div className="d-flex align-items-center">
                      <strong>{post.createdByUsername}</strong>
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
