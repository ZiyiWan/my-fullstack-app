"use client";
import { UserOutlined } from "@ant-design/icons";
import { Card, Avatar, Divider, Typography } from "antd";
import React from "react";
interface Props {
  name: string;
  email: string;
  phone: string;
}
//const UserCard = (props:Props)
const UserCard = ({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) => {
  const { Title } = Typography;
  return (
    <Card title="Personal Information" style={{ maxWidth: 350 }}>
      <div className="justify-center items-center flex-col flex gap-4">
        <Avatar
          size={72}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#87d068" }}
        />
        <p>{name}</p>
      </div>
      <Divider />
      <Title level={4}>Email:</Title>
      <div>{email}</div>
      <Divider />
      <Title level={4}>Phone Number:</Title>
      <div>{phone}</div>
    </Card>
  );
};

export default UserCard;
