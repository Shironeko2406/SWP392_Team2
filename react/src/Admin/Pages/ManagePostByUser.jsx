import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserManageActionAsync } from "../../Redux/Reducer/UserReducer";
import { NavLink } from "react-router-dom";

const ManagePostByUser = () => {
  const { userList } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  console.log(userList);
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
      tableRef.current = $("#manage-post-by-user-table").DataTable();
    }
  }, [userList]);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Manage Post By User</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="manage-post-by-user-table"
                className="display table table-striped table-hover"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>User Name</th>
                    <th>Show Post</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>User Name</th>
                    <th>Show Post</th>
                  </tr>
                </tfoot>
                <tbody>
                  {userList
                    .filter(
                      (user) =>
                        user.username.toLowerCase() !== "admin" &&
                        user.username.toLowerCase() !== "staff" &&
                        user.username.toLowerCase() !== "parent1"
                    )
                    .map((user, index) => (
                      <tr key={user.accountId}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>
                          <div className="form-button-action">
                            <a
                              href={`/admin/${user.accountId}`}
                              className="btn btn-link btn-primary btn-lg"
                              data-bs-toggle="tooltip"
                              title="View User"
                              data-original-title="Edit Task"
                            >
                              <i className="fa fa-eye"></i>
                            </a>
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
    </div>
  );
};

export default ManagePostByUser;
