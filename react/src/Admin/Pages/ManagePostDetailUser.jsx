import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPostListUserByIdActionAsync,
  getPostRequestByIdActionAsync,
} from "../../Redux/Reducer/PostRequestReducer";
import { Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { GetViewUserByIdActionAsync } from "../../Redux/Reducer/UserReducer";
import ShowPostUser from "../Component/Modal/ShowPostUser";

const ManagePostDetailUser = () => {
  const dispatch = useDispatch();
  const { postListUserId } = useSelector((state) => state.PostRequestReducer);
  const { viewUserById } = useSelector((state) => state.UserReducer);
  console.log(postListUserId);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const params = useParams();
  const tableRef = useRef(null);
  const { id } = params;

  const getPostListUserById = async () => {
    const actionAsync = GetPostListUserByIdActionAsync(id);
    dispatch(actionAsync);
  };

  const getUserTitle = async () => {
    const actionAsync = GetViewUserByIdActionAsync(id);
    dispatch(actionAsync);
  };

  useEffect(() => {
    // action get data user
    getPostListUserById();
    getUserTitle();
  }, [id]);

  const handleGetPostById = (id) => {
    const actionAsync = getPostRequestByIdActionAsync(id);
    dispatch(actionAsync);
    console.log(id);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    // Khởi tạo DataTable sau khi có dữ liệu
    if (postListUserId.length > 0) {
      if (tableRef.current) {
        tableRef.current.destroy();
      }
      tableRef.current = $("#manage-post-by-user-id-table").DataTable();
    }
  }, [postListUserId]);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">
              Management Post Of {viewUserById.fullname}
            </h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="manage-post-by-user-id-table"
                className="display table table-striped table-hover"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Created By</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Created By</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {postListUserId.map((post, index) => (
                    <tr key={post.postId}>
                      <td>{index + 1}</td>
                      <td>{post.createdByUsername}</td>
                      <td>{new Date(post.createdDate).toLocaleString()}</td>
                      <td>
                        {post.status === 0 && (
                          <Tag icon={<SyncOutlined spin />} color="processing">
                            Pending
                          </Tag>
                        )}
                        {post.status === 1 && (
                          <Tag icon={<CheckCircleOutlined />} color="success">
                            Public
                          </Tag>
                        )}
                        {post.status === 3 && (
                          <Tag icon={<CloseCircleOutlined />} color="error">
                            Deleted
                          </Tag>
                        )}
                      </td>
                      <td>
                        <div className="form-button-action">
                          <button
                            type="button"
                            data-bs-toggle="tooltip"
                            title
                            className="btn btn-link btn-primary btn-lg"
                            data-original-title="Edit Task"
                            onClick={() => handleGetPostById(post.postId)}
                          >
                            <i class="fas fa-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ShowPostUser
        visible={isModalVisible}
        onClose={handleModalClose}
      ></ShowPostUser>
    </div>
  );
};

export default ManagePostDetailUser;
