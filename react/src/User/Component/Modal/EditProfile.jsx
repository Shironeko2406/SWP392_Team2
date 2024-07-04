// import React, { useEffect } from 'react';
// import { Modal, Form, Input, Select, Upload, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from "react-redux";

// const EditProfile = ({ visible, onOk, onCancel }) => {
//   const [form] = Form.useForm();
//   const dispatch = useDispatch()
//   const {userProfile} = useSelector((state) => state.UserReducer)

//   useEffect(() => {
//     form.setFieldsValue({
//       username: userProfile?.username,
//       email: userProfile?.email,
//       phone: userProfile?.phone,
//       address: userProfile?.address,
//       gender: userProfile?.gender,
//       avatarUrl: userProfile?.avatarUrl,
//     });
//   }, [userProfile, form]);

//   return (
//     <Modal
//       title="Edit User Info"
//       visible={visible}
//       onOk={() => {
//         form.validateFields().then((values) => {
//           onOk(values);
//         }).catch((info) => {
//           console.log('Validate Failed:', info);
//         });
//       }}
//       onCancel={onCancel}
//       okText="Save"
//       cancelText="Cancel"
//     >
//       <Form form={form} layout="vertical" name="userForm">
//         <Form.Item
//           name="username"
//           label="Name"
//           rules={[{ required: true, message: 'Please input your name!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="email"
//           label="Email"
//           rules={[{ required: true, message: 'Please input your email!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="phone"
//           label="Phone"
//           rules={[{ required: true, message: 'Please input your phone number!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="address"
//           label="Address"
//           rules={[{ required: true, message: 'Please input your address!' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="gender"
//           label="Gender"
//           rules={[{ required: true, message: 'Please select your gender!' }]}
//         >
//           <Select>
//             <Select.Option value={1}>Female</Select.Option>
//             <Select.Option value={2}>Male</Select.Option>
//           </Select>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default EditProfile;

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
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { imageDB } from "../../../FirebaseConfig/Config";

const EditProfile = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const { userProfile } = useSelector((state) => state.UserReducer);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      form.setFieldsValue({
        username: userProfile.username,
        fullname: userProfile.fullname,
        password: userProfile.password,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,
        gender: userProfile.gender,
        avatarUrl: userProfile.avatarUrl
          ? [
              {
                uid: "-1",
                name: "avatar.png",
                status: "done",
                url: userProfile.avatarUrl,
              },
            ]
          : [],
      });
    }
  }, [userProfile, form]);

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
      title="Edit User Info"
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
              name="username"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
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
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
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

export default EditProfile;
