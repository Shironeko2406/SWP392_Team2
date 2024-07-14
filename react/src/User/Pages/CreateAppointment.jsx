import React from "react";
import { Form, Input, DatePicker, TimePicker, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDataJSONStorage, USER_LOGIN } from "../../Utils/UtilFuction";
import moment from "moment";
import { CreateAppointmentActionAsync } from "../../Redux/Reducer/AppointmentReducer";
import { useNavigate } from "react-router-dom";

const CreateAppointment = () => {
  const { dataAppointment } = useSelector((state) => state.AppointmentReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(dataAppointment);

  const onFinish = (values) => {
    const user = getDataJSONStorage(USER_LOGIN);

    // Chuyển đổi giá trị date và time thành chuỗi
    const dateString = values.date.format("YYYY-MM-DD");
    const timeString = values.time.format("HH:mm:ss");

    // Kết hợp date và time thành một chuỗi
    const appointmentDateTimeString = `${dateString}T${timeString}`;

    // Chuyển đổi chuỗi thành đối tượng moment với UTC
    const appointmentDateTime = moment
      .utc(appointmentDateTimeString)
      .toISOString();
    const formAppointment = {
      appointmentTime: appointmentDateTime,
      address: values.address,
      accountId: user.UserId,
      tutorId: dataAppointment.tutorId,
      postId: dataAppointment.postId,
      appointmentId: 1,
    };
    const actionAsync = CreateAppointmentActionAsync(formAppointment, navigate);
    dispatch(actionAsync);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2>Make an appointment with {dataAppointment.fullname}</h2>
      <Form name="appointmentForm" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="address"
          label="Address"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ của bạn!" },
          ]}
        >
          <Input placeholder="Nhập địa điểm của bạn" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="time"
          label="Time Schedule"
          rules={[{ required: true, message: "Vui lòng chọn thời gian!" }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đặt Lịch Hẹn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAppointment;
