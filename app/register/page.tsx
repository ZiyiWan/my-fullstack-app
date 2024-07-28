"use client";
import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, message, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage: React.FC = () => {
  const { Title } = Typography;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: {
    username: string;
    password: string;
    email: string;
    phone: string;
    accnum: string;
    bsb: string;
    accname: string;
  }) => {
    setLoading(true);
    try {
      console.log(values);
      const response = await axios.post("/api/auth/register", values);
      console.log(response);
      router.push(`/user/${response.data.userId}/info?new=true`);
    } catch (error) {
      message.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-28">
        <Title>Teaching Service Invoice System</Title>{" "}
      </div>
      <div className="max-w-sm mx-auto my-8">
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={handleRegister}
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
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input a valid Email address!",
                type: "email",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone number!",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="accname"
            rules={[
              { required: true, message: "Please input your Account Name!" },
            ]}
          >
            <Input placeholder="Account Name" />
          </Form.Item>
          <Form.Item
            name="accnum"
            rules={[
              {
                required: true,
                message: "Please input your Account Number!",
              },
            ]}
          >
            <Input placeholder="Account Number" />
          </Form.Item>
          <Form.Item
            name="bsb"
            rules={[
              {
                required: true,
                message: "Please input your BSB number!",
              },
            ]}
          >
            <Input placeholder="BSB" />
          </Form.Item>
          <Form.Item
            name="bankname"
            rules={[
              { required: true, message: "Please input your Bank Name!" },
            ]}
          >
            <Input placeholder="Bank Name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <div>
          Already had an account?{" "}
          <Link href={"/login"}>
            <Button type="link">Click here to sign in</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
