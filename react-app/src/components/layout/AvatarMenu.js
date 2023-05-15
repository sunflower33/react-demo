import React from "react";
import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
function AvatarMenu(props) {
  const menus = [
    {
      key: "roleName",
      label: props.roleName,
    },
    {
      key: "home",
      danger: true,
      label: "Logout  ",
    },
  ];
  const handleMenuClick = (item) => {
    if (item.key === "home") {
      localStorage.removeItem("token");
      props.history.replace("/login");
    }
  };
  return (
    <Dropdown menu={{ items: menus, onClick: handleMenuClick }}>
      <Avatar size={32} icon={<UserOutlined />} />
    </Dropdown>
  );
}
export default withRouter(AvatarMenu);
