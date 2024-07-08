import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

const AddQualification = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Add a new qualification"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="qualification"
          label="Qualification"
          rules={[
            {
              required: true,
              message: 'Please input the qualification!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddQualification;
