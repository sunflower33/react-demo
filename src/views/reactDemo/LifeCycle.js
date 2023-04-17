import { Tabs } from "antd";
import React, { Suspense } from "react";
const LifeCycleDemoV1 = React.lazy(() =>
  import("../../demo/生命周期/生命周期V1/LifecycleDemo")
);
const LifecycleDemoV2 = React.lazy(() =>
  import("../../demo/生命周期/生命周期V2/lifecycleDemoV2")
);
export default function LifeCycle(props) {
  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      items={[
        {
          label: `新生命周期`,
          key: "lifeCycleDemoV2",
          children: (
            <Suspense fallback={"正在加载中......"}>
              <LifecycleDemoV2 />
            </Suspense>
          ),
        },
        {
          label: `老生命周期`,
          key: "LifecycleDemo",
          children: (
            <Suspense fallback={"正在加载中......"}>
              <LifeCycleDemoV1 />
            </Suspense>
          ),
        },
      ]}
    />
  );
}
