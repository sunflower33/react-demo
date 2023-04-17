import React from "react";
import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
export default function AvatarMenu() {
  const menus = [
    {
      key: "Home",
      danger: true,
      label: "Logout  ",
    },
  ];
  return (
    <Dropdown menu={{ items: menus }}>
      <Avatar size={64} icon={<UserOutlined />} />
    </Dropdown>
  );
}
