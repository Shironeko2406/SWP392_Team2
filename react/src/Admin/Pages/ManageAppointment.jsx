import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAppointmentActionAsync } from "../../Redux/Reducer/AppointmentReducer";
import { Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";

const ManageAppointment = () => {
  const { appointmentList } = useSelector((state) => state.AppointmentReducer);
  const dispatch = useDispatch();
  const tableRef = useRef(null);

  useEffect(() => {
    // action get data user
    const actionAsync = GetAppointmentActionAsync();
    dispatch(actionAsync);
  }, []);

  useEffect(() => {
    // Khởi tạo DataTable sau khi có dữ liệu
    if (appointmentList.length > 0) {
      if (tableRef.current) {
        tableRef.current.destroy();
      }
      tableRef.current = $("#appointment-management-table").DataTable();
    }
  }, [appointmentList]);

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
            Accept
          </Tag>
        );
      case 2:
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Cancel
          </Tag>
        );
      default:
        return null;
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Appointment Table</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="appointment-management-table"
                className="display table table-striped table-hover"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Account</th>
                    <th>Tutor Name</th>
                    <th>Time</th>
                    <th>Address</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Account</th>
                    <th>Tutor Name</th>
                    <th>Time</th>
                    <th>Address</th>
                    <th>Status</th>
                  </tr>
                </tfoot>
                <tbody>
                  {appointmentList.map((appointment, index) => (
                    <tr key={appointment.appointmentId}>
                      <td>{appointment.appointmentId}</td>
                      <td>{appointment.accountUsername}</td>
                      <td>{appointment.tutorUsername}</td>
                      <td>
                        {new Date(appointment.appointmentTime).toLocaleString()}
                      </td>
                      <td>{appointment.address}</td>
                      <td>{renderStatusTag(appointment.status)}</td>
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

export default ManageAppointment;
