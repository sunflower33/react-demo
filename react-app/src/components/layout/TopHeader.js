import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import { changeSiderCollapsed } from "../../redux/actionCreator/ActionLayout";
import AvatarMenu from "./AvatarMenu";
const { Header } = Layout;

function TopHeader(props) {
  const StyledAvatar = styled.div`
    padding: 0 14px;
  `;
  const {
    token: { colorBgContainer, colorLink },
  } = theme.useToken();
  const {
    username,
    role: { roleName },
  } = JSON.parse(localStorage.getItem("token"));
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={
          props.isSiderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
        }
        onClick={() => props.changeSiderCollapsed()}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <StyledAvatar className="float-right">
        <span style={{ marginRight: "10px" }}>
          欢迎<span style={{ color: colorLink }}>{username}</span>回来
        </span>
        <AvatarMenu roleName={roleName} />
      </StyledAvatar>
    </Header>
  );
}

const mapStateToProps = (state) => {
  const {
    ReducerLayout: { isSiderCollapsed },
  } = state;
  return {
    isSiderCollapsed,
  };
};
const mapDispatchToProps = {
  changeSiderCollapsed,
};
export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
