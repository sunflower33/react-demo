import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
const { Sider } = Layout;

const iconList = {
  "/home": <UserOutlined />,
  "/user-manage": <UploadOutlined />,
  "/user-manage/list": <UploadOutlined />,
  "/user-manage/role/list": <UserOutlined />,
  "/user-manage/right/list": <VideoCameraOutlined />,
};

function SideMenu(props) {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const checkPagePermission = (item) => {
      return item.pagepermisson === 1;
    };
    const {
      role: { rights },
    } = JSON.parse(localStorage.getItem("token"));
    const formatMenu = (menu) => {
      return menu
        .filter(
          (item) => checkPagePermission(item) && rights.includes(item.key)
        )
        .map((item) => {
          item.rightId && delete item.rightId;
          item.label = item.title;
          item.icon = iconList[item.key] || "";
          if (item.children?.length) {
            item.children = formatMenu(item.children);
          } else {
            item?.children && delete item.children;
          }
          return item;
        });
    };
    axios.get("/rights?_embed=children").then((response) => {
      const rightList = response.data.filter(
        (item) => checkPagePermission(item) && rights.includes(item.key)
      );
      setMenu(formatMenu(rightList));
    });
  }, []);
  const menuChange = (value) => {
    props.history.push(value.key);
  };
  const openKeys = [`/${props.location.pathname.split("/")[1]}`];
  const selectKeys = [props.location.pathname];
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <Space
        direction="vertical"
        style={{ height: "100vh", width: "100%", overflow: "hidden" }}
      >
        <div
          className="logo text-center"
          style={{ color: "white", padding: "10px" }}
        >
          logoquiz
        </div>
        <Menu
          style={{ flex: "1", overflow: "auto" }}
          theme="dark"
          mode="inline"
          defaultOpenKeys={openKeys}
          selectedKeys={selectKeys}
          items={menu}
          onClick={menuChange}
        />
      </Space>
    </Sider>
  );
}

export default withRouter(SideMenu);
