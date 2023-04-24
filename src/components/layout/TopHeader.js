import { Layout, theme } from "antd";
import styled from "styled-components";
import AvatarMenu from "./AvatarMenu";
const { Header } = Layout;
export default function TopHeader() {
  const StyledAvatar = styled.div`
    padding: 0 14px;
  `;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <StyledAvatar className="float-right">
        <AvatarMenu />
      </StyledAvatar>
    </Header>
  );
}
