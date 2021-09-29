import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useListener } from "@/hooks/useBus";
import { login, register } from '@/store/user/actions'

function SignModal(props) {
  const dispatch = useDispatch();
  const [type, setType] = useState("login");
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      const action = type === "login" ? login : register;
      dispatch(action(values)).then(() => {
        setVisible(false);
      });
    });
  };

  useListener("openSignModal", (type) => {
    form.resetFields();
    setType(type);
    setVisible(true);
  });
  return (
    <Modal
      width={460}
      title={type}
      visible={visible}
      onCancel={(e) => setVisible(false)}
      footer={null}
    >
      <Form layout="horizontal" form={form} {...formItemLayout}>
        {type === "login" ? (
          <>
            <Form.Item
              label="name"
              name="account"
              rules={[{ required: true, message: "name is required" }]}
            >
              <Input placeholder="Please input your name!" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label="name"
              name="account"
              rules={[{ required: true, message: "name is required" }]}
            >
              <Input placeholder="Please input your name!" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}
      </Form>
      <Button type="primary" block onClick={handleSubmit}>
        {type}
      </Button>
    </Modal>
  );
}
export default SignModal;
