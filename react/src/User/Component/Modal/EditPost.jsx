import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentDateTime } from "../../../Utils/UtilFuction";
import { resetPostByIdAction, updatePostByIdActionAsync } from "../../../Redux/Reducer/PostRequestReducer";

const { Option } = Select;

const EditPost = ({ visible, onClose, postId }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { postById } = useSelector((state) => state.PostRequestReducer);

  useEffect(() => {
    if (postById) {
      form.setFieldsValue({
        description: postById.description,
        location: postById.location,
        schedule: postById.schedule,
        preferredTime: postById.preferredTime,
        gender: postById.gender?.toString(),
        requestSkill: postById.requestSkill,
      });
    }
  }, [postById, form]);

  const handleFinish = (values) => {
    const currentTime = getCurrentDateTime();
    const valuesToSend = {
      ...values,
      gender: parseInt(values.gender) || 0, // Convert gender value to an integer
      createdDate: currentTime,
    //   postId: postId,
    };

    console.log(valuesToSend);
    const actionAsync = updatePostByIdActionAsync(postId, valuesToSend);
    dispatch(actionAsync);

    // Reset the form fields after submission
    form.resetFields();

    // Close the modal
    onClose();
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(resetPostByIdAction());
    onClose();
  }

  return (
    <Modal
      title="Edit Post"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter a description" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="location" label="Location" rules={[{ required: true, message: "Please enter a location" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="schedule" label="Schedule" rules={[{ required: true, message: "Please enter a schedule" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="preferredTime" label="Preferred Time" rules={[{ required: true, message: "Please enter a preferred time" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select a gender" }]}>
          <Select>
            <Option value="1">Male</Option>
            <Option value="2">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item name="requestSkill" label="Request Skill" rules={[{ required: true, message: "Please enter a request skill" }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPost;
