import { Menu } from "antd";
import React from "react";
import type { MenuProps } from "antd";
import { FormOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
type MenuItem = Required<MenuProps>["items"][number];

interface Props {
  id: string;
}

const SideBar = (props: Props) => {
  const router = useRouter();
  const items: MenuItem[] = [
    { key: "info", label: "User Information", icon: <UserOutlined /> },
    { key: "serviceForm", label: "Service Form", icon: <FormOutlined /> },
  ];

  const handleClick: MenuProps["onClick"] = (e) => {
    router.push(`/user/${props.id}/${e.key}`);
  };
  return <Menu items={items} mode="inline" onClick={handleClick} />;
};

export default SideBar;
