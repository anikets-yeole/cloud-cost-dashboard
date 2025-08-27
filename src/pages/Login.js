import React, { useState, useContext } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { AuthContext } from "../context/AuthContext";
import { login as loginApi } from "../api/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await loginApi(values.username, values.password);
      login(res);
      navigate("/", { replace: true });    // if we not use  replace attribute then then after logging in: The login page (/login) would remain in the browser’s history stack.
    } catch (e) {
      message.error(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: 16 }}>
      <Card style={{ width: 360 }}>
        <Typography.Title level={3}>Sign In</Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input autoFocus />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>Login</Button>
        </Form>
      </Card>
    </div>
  );
}
