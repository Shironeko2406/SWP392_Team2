import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Row,
  Col,
  message,
} from "antd";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { imageDB } from "../../../FirebaseConfig/Config";
import { UploadOutlined } from "@ant-design/icons";

const EditProfileTutor = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const { tutorProfile } = useSelector((state) => state.TutorReducer);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (tutorProfile) {
      form.setFieldsValue({
        fullname: tutorProfile.fullname,
        email: tutorProfile.email,
        phone: tutorProfile.phone,
        address: tutorProfile.address,
        gender: tutorProfile.gender,
        avatarUrl: tutorProfile.avatarUrl
          ? [
              {
                uid: "-1",
                name: "avatar.png",
                status: "done",
                url: tutorProfile.avatarUrl,
              },
            ]
          : [],
      });
    }
  }, [tutorProfile, form]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleUpload = async (file) => {
    setUploading(true);
    const shortUUID = uuidv4().split("-")[0];
    const fileRef = ref(imageDB, `avatars/${shortUUID}_${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    setUploading(false);
    return downloadURL;
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (
        values.avatarUrl &&
        values.avatarUrl[0] &&
        values.avatarUrl[0].originFileObj
      ) {
        const file = values.avatarUrl[0].originFileObj;
        const avatarUrl = await handleUpload(file);
        values.avatarUrl = avatarUrl;
      } else {
        values.avatarUrl = userProfile.avatarUrl;
      }
      onOk(values);
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  return (
    <Modal
      title="Edit tutor Info"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      confirmLoading={uploading}
    >
      <Form form={form} layout="vertical" name="userForm">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="fullname"
              label="Full name"
              rules={[
                { required: true, message: "Please input your fullname!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="avatarUrl"
              label="Avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="You can only upload JPG/PNG file and the image must be smaller than 2MB."
            >
              <Upload
                name="avatar"
                listType="picture"
                maxCount={1}
                beforeUpload={beforeUpload}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Select>
                <Select.Option value={3}>Other</Select.Option>
                <Select.Option value={1}>Male</Select.Option>
                <Select.Option value={2}>Female</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditProfileTutor;
