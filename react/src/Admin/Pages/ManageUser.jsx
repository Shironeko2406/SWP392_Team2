import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserByIdActionAsync,
  GetUserManageActionAsync,
  GetViewUserByIdActionAsync,
} from "../../Redux/Reducer/UserReducer";
import ViewUserAdmin from "../Component/Modal/ViewUserAdmin";
import { Modal } from "antd";

const ManageUser = () => {
  const { userList } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  console.log(userList);
  const [isModalViewUserVisible, setIsModalViewUserVisible] = useState(false);

  const tableRef = useRef(null);

  useEffect(() => {
    // action get data user
    const actionAsync = GetUserManageActionAsync();
    dispatch(actionAsync);
  }, []);

  useEffect(() => {
    // Khởi tạo DataTable sau khi có dữ liệu
    if (userList.length > 0) {
      if (tableRef.current) {
        tableRef.current.destroy();
      }
      tableRef.current = $("#user-manage-table").DataTable();
    }
  }, [userList]);

  const getGenderText = (gender) => {
    switch (gender) {
      case 1:
        return "Male";
      case 2:
        return "Female";
      case 0:
      default:
        return "Other";
    }
  };

  const handleUserDelete = (id) => {
    return () => {
      Modal.confirm({
        title: "Are you sure you want to delete this user?",
        onOk: () => {
          const actionAsync = DeleteUserByIdActionAsync(id);
          dispatch(actionAsync);
        },
      });
    };
  };

  const handleViewUserById = (id) => {
    const actionAsync = GetViewUserByIdActionAsync(id);
    dispatch(actionAsync);
    setIsModalViewUserVisible(true);
  };

  const handleModalViewUserClose = () => {
    setIsModalViewUserVisible(false);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">User Management</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="user-manage-table"
                className="display table table-striped table-hover"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {userList.map((user, index) => (
                    <tr key={user.accountId}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.phone}</td>
                      <td>{getGenderText(user.gender)}</td>
                      <td>
                        <div className="form-button-action">
                          <button
                            type="button"
                            data-bs-toggle="tooltip"
                            title
                            className="btn btn-link btn-primary btn-lg"
                            data-original-title="Edit Task"
                            onClick={() => handleViewUserById(user.accountId)}
                          >
                            <i className="fa fa-eye"></i>
                          </button>
                          <button
                            type="button"
                            data-bs-toggle="tooltip"
                            title="delete user"
                            className="btn btn-link btn-danger"
                            data-original-title="Remove"
                            onClick={handleUserDelete(user.accountId)}
                          >
                            <i className="fa fa-times" />
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
      <ViewUserAdmin
        visible={isModalViewUserVisible}
        onClose={handleModalViewUserClose}
      ></ViewUserAdmin>
    </div>
  );
};

export default ManageUser;
