import React from "react";
import { Typography } from "antd";

export default function PageHeader(props) {
  return (
    <header style={{ display: "flex"}}>
      <Typography.Title level={3}>{props.title}</Typography.Title>
      {props.children}
    </header>
  );
}
