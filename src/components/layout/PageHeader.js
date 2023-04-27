import { Space, Typography } from "antd";
const { Text } = Typography;
export default function PageHeader(props) {
  return (
    <Space>
      <Typography.Title level={3}>
        <Space>
          {props.left} {props.title}
        </Space>
      </Typography.Title>
      {props.subTitle && <Text type="secondary">{props.subTitle}</Text>}
    </Space>
  );
}
