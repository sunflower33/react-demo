import { Button, Space } from "antd";
import { useRef, forwardRef } from "react";

const Child = forwardRef((props, ref) => {
  return <input type="text" ref={ref} defaultValue="safdsgfads" />;
});

export default function ForwardRefDemo() {
  const testForwordRef = useRef();
  return (
    <Space size="large">
      <Button
        onClick={() => {
          console.log(testForwordRef);
          testForwordRef.current.value = "";
          testForwordRef.current.focus();
        }}
      >
        体验Ref透传 --- forwordRef
      </Button>
      <Child ref={testForwordRef} />
    </Space>
  );
}
