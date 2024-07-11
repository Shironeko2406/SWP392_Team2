import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPostListPendingActionAsync,
  getPostRequestByIdActionAsync,
} from "../../Redux/Reducer/PostRequestReducer";
import ShowPostIdPending from "../Component/Modal/ShowPostIdPending";

const ManagePostPending = () => {
  const { postListPending } = useSelector((state) => state.PostRequestReducer);
  const dispatch = useDispatch();
  console.log(postListPending);
  const tableRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [PostIdPending, setPostIdPending] = useState(null);

  useEffect(() => {
    // action get data user
    const actionAsync = GetPostListPendingActionAsync();
    dispatch(actionAsync);
  }, []);

  const handleGetPostById = (id) => {
    setPostIdPending(id);
    const actionAsync = getPostRequestByIdActionAsync(id);
    dispatch(actionAsync);
    console.log(id)
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setPostIdPending(null);
  };

  useEffect(() => {
    // Khởi tạo DataTable sau khi có dữ liệu
    if (postListPending.length > 0) {
      if (tableRef.current) {
        tableRef.current.destroy();
      }
      tableRef.current = $("#post-request-pending-table").DataTable();
    }
  }, [postListPending]);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Post Pending</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="post-request-pending-table"
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
                  {postListPending.map((post, index) => (
                    <tr key={post.postId}>
                      <td>{index + 1}</td>
                      <td>{post.createdByUsername}</td>
                      <td>{new Date(post.createdDate).toLocaleString()}</td>
                      <td>
                        <span class="badge badge-primary">
                          {post.status === 0 ? "Pending..." : post.status}
                        </span>
                      </td>
                      <td>
                        <div className="form-button-action">
                          <button
                            type="button"
                            data-bs-toggle="tooltip"
                            title
                            className="btn btn-link btn-primary btn-lg"
                            data-original-title="Edit Task"
                            onClick={()=> handleGetPostById(post.postId)}
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
      <ShowPostIdPending
      visible={isModalVisible}
      onClose={handleModalClose}
      postId={PostIdPending}
      ></ShowPostIdPending>
    </div>
  );
};

export default ManagePostPending;
