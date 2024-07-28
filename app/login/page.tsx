"use client";
import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title } = Typography;
const LoginPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", values);
      router.push(`/user/${response.data.userId}/info?new=false`);
    } catch (error) {
      message.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-28">
        <Title>Teaching Service Invoice System</Title>
      </div>
      <div className="max-w-sm mx-auto my-8">
        <Form
          name="login"
          onFinish={handleLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div>
          Don't have an account?{" "}
          <Link href={"/register"}>
            <Button type="link">Click here to create</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
