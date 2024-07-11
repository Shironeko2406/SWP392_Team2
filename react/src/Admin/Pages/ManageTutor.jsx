import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTutorListManageActionAsync,
  ViewTutorByIdActionAsync,
} from "../../Redux/Reducer/TutorReducer";
import ViewTutorAdmin from "../Component/Modal/ViewTutorAdmin";

const ManageTutor = () => {
  const { tutorList } = useSelector((state) => state.TutorReducer);
  const [isModalViewTutorVisible, setIsModalViewTutorVisible] = useState(false);
  console.log(tutorList);
  const tableRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // action get data user
    const actionAsync = GetTutorListManageActionAsync();
    dispatch(actionAsync);
  }, []);

  useEffect(() => {
    // Khởi tạo DataTable sau khi có dữ liệu
    if (tutorList.length > 0) {
      if (tableRef.current) {
        tableRef.current.destroy();
      }
      tableRef.current = $("#tutor-manage-table").DataTable();
    }
  }, [tutorList]);

  const handleViewTutorById = (id) => {
    const actionAsync = ViewTutorByIdActionAsync(id);
    dispatch(actionAsync);
    setIsModalViewTutorVisible(true);
  };

  const handleModalViewTutorClose = () => {
    setIsModalViewTutorVisible(false);
  };

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

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Tutor Management</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="tutor-manage-table"
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
                  {tutorList.map((tutor, index) => (
                    <tr key={tutor.tutorId}>
                      <td>{index + 1}</td>
                      <td>{tutor.username}</td>
                      <td>{tutor.email}</td>
                      <td>{tutor.address}</td>
                      <td>{tutor.phone}</td>
                      <td>{getGenderText(tutor.gender)}</td>
                      <td>
                        <div className="form-button-action">
                          <button
                            type="button"
                            data-bs-toggle="tooltip"
                            title
                            className="btn btn-link btn-primary btn-lg"
                            data-original-title="Edit Task"
                            onClick={() => handleViewTutorById(tutor.tutorId)}
                          >
                            <i className="fa fa-eye"></i>
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
      <ViewTutorAdmin
        visible={isModalViewTutorVisible}
        onClose={handleModalViewTutorClose}
      ></ViewTutorAdmin>
    </div>
  );
};

export default ManageTutor;
