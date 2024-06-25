import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { CreatePostActionAsync } from "../../../Redux/Reducer/PostRequestReducer";
import { getCurrentDateTime } from "../../../Utils/UtilFuction";

const { Option } = Select;

const CreatePost = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const currentTime = getCurrentDateTime();
    const valuesToSend = {
      ...values,
      gender: parseInt(values.gender) || 0, 
      createdDate: currentTime,
    };
    console.log(valuesToSend);

    const actionAsync = CreatePostActionAsync(valuesToSend);
    dispatch(actionAsync);
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Create Post"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please input the location!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="schedule"
          label="Schedule"
          rules={[{ required: true, message: "Please input the schedule!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="preferredTime"
          label="Preferred Time"
          rules={[
            { required: true, message: "Please input the preferred time!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select the gender!" }]}
        >
          <Select placeholder="Select Gender">
            <Option value="1">Male</Option>
            <Option value="2">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="requestSkill"
          label="Request Skill"
          rules={[
            { required: true, message: "Please input the request skill!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePost;
