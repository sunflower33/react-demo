import { Button, Divider, Space } from "antd";
import { memo, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import ForwardRefDemo from "../../demo/feature-demo/ForwardRefDemo";
import ImmutableDemo from "../../demo/feature-demo/ImmutableDemo";
import StyledComponentsDemo from "../../demo/feature-demo/StyledComponentsDemo";

const PortalModal = (props) => {
  const ModalWrap = styled.div`
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.7)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  `;
  const modal = (
    <ModalWrap
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <ul>
        <li>Portal弹窗</li>
        <li>styled-components：可实现属性透传</li>
      </ul>
      <div>
        <Button block={false} onClick={() => props.onClose()}>
          Close
        </Button>
      </div>
    </ModalWrap>
  );
  return createPortal(modal, document.body);
};

const MemoComponent = memo((props) => {
  console.log("渲染了吗？？？？");
  return <div>缓存组件，跟PureComponent类似, {props.title}</div>;
});

export default function FeatureDemo() {
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [memoTitle, setMemoTitle] = useState("初始化~~~~~");
  return (
    <Space direction="vertical">
      <section>
        <Button
          onClick={() => {
            setShowPortalModal(!showPortalModal);
          }}
        >
          体验Portal && 体验styled-components
        </Button>
        {showPortalModal && (
          <PortalModal
            onClose={() => {
              setShowPortalModal(!showPortalModal);
            }}
          />
        )}
      </section>
      <Divider />
      <section>
        <ForwardRefDemo />
      </section>
      <Divider />
      <section>
        <Space direction="vertical">
          <h5> 体验 React.memo()</h5>
          <Space>
            <Button
              onClick={() => {
                setMemoTitle("重新渲染~~~~");
              }}
            >
              重新渲染
            </Button>
          </Space>
          <MemoComponent title={memoTitle} />
        </Space>
      </section>
      <Divider />
      <StyledComponentsDemo />
      <Divider />
      <ImmutableDemo />
    </Space>
  );
}
