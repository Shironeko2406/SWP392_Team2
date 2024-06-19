import React, { useEffect } from "react";
import "../../index.css";
import {
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Layout, Typography } from "antd";
import ModalEditPost from "./Modal/ModalEditPost";
import ModalCreatePost from "./Modal/ModalCreatePost";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPostListUserLoginActionAsync,
  getPostRequestByIdActionAsync,
} from "../../Redux/Reducer/PostRequestReducer";

const { Header, Content } = Layout;
const { Title } = Typography;

const PostContent = () => {
  const { tokenUser } = useSelector((state) => state.UserReducer);
  console.log(tokenUser);
  const { postListUserLogin } = useSelector(
    (state) => state.PostRequestReducer
  );

  console.log(postListUserLogin);

  const dispatch = useDispatch();
  useEffect(() => {
    const actionAsync = GetPostListUserLoginActionAsync();
    dispatch(actionAsync);
  }, []);

  const handleDeletePostById = (id) => {
    return () => {
      // const actionAsync = DeletePostByIdActionAsync(id);
      // dispatch(actionAsync);
      // console.log(id)
    };
  };

  const handleGetPostById = (id) => {
    return () => {
      const actionAsync = getPostRequestByIdActionAsync(id);
      dispatch(actionAsync);
    };
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <div className="d-flex justify-content-between ">
            <Title level={3} style={{ margin: "16px" }}>
              Post Content
            </Title>
            <button
              className="btn btn-success rounded-circle"
              style={{
                width: "40px",
                height: "40px",
                border: "none",
                margin: "16px",
              }}
              data-bs-toggle="modal"
              data-bs-target="#modalIdCreatePost"
            >
              <PlusOutlined />
            </button>
          </div>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div className="container mt-3">
            {postListUserLogin.map((post) => (
              <div key={post.postId} className="card mb-3">
                <div className="card-header d-flex align-items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq1_NUx_3Q5UK_XadfRgMqo_7X4dILRtBCSQ&s"
                    alt="User Avatar"
                    className="rounded-circle me-2"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <strong>Nahida</strong>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      {post.createdDate}
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">{post.description}</p>
                  {/* {post.image && (
                    <img src={post.image} alt="Post" className="card-img-top mt-2" />
                  )} */}
                </div>
                <div className="card-footer d-flex justify-content-around">
                  <a href="#">
                    <Badge count={1}>
                      <Avatar
                        shape="square"
                        size="large"
                        icon={<MailOutlined />}
                      />
                    </Badge>
                  </a>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#modalId"
                    onClick={handleGetPostById(post.postId)}
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeletePostById(post.postId)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            ))}
            <ModalEditPost />
            <ModalCreatePost></ModalCreatePost>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PostContent;
