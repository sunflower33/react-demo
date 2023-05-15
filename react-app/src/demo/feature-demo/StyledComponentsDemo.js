import { Space } from "antd";
import styled, { keyframes } from "styled-components";

export default function StyledComponentsDemo() {
  const animation = keyframes`
        from{
            transform: rotate(0deg)
        }
        to{
            transform: rotate(360deg)
        }
    `;
  const StyleButtonComp = styled(TestComponent)`
    background: red;
  `;
  const ButtonYellow = styled(StyleButtonComp)`
    background: yellow;
    animation: ${animation} 1s infinite;
  `;
  return (
    <Space>
      <StyleButtonComp />
      <ButtonYellow>动画组件</ButtonYellow>
    </Space>
  );
}

function TestComponent(props) {
  return (
    <button className={props.className}>
      {props.children || "样式化组件"}
    </button>
  );
}
