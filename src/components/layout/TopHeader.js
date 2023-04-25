import { Layout, theme } from "antd";
import styled from "styled-components";
import AvatarMenu from "./AvatarMenu";
const { Header } = Layout;
export default function TopHeader() {
  const StyledAvatar = styled.div`
    padding: 0 14px;
  `;
  const {
    token: { colorBgContainer,colorLink },
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
      <StyledAvatar className="float-right">
      
        <span style={{marginRight: '10px'}}>欢迎<span style={{color: colorLink}}>{username}</span>回来</span>
        <AvatarMenu roleName={roleName} />
      </StyledAvatar>
    </Header>
  );
}
