import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Descriptions, Space, Tag, Typography } from "antd";
import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import {
  AuditStateColor,
  AuditStateMap,
  PublishStateColor,
  PublishStateMap,
} from "../../config/enum";

const { Text } = Typography;

export default function NewsPreview(props) {
  const [dataSource, setDataSource] = useState(null);
  useEffect(() => {
    axios
      .get(`/news/${props.match.params.id}?_expand=role&_expand=category`)
      .then((res) => {
        console.log(res.data);
        setDataSource(res.data);
      });
  }, [props.match.params.id]);

  return (
    <>
      {dataSource && (
        <Space direction="vertical">
          <PageHeader
            left={<ArrowLeftOutlined onClick={() => props.history.goBack()} />}
            title={dataSource.title}
            subTitle={dataSource.category.title}
          ></PageHeader>
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="创作者">
              {dataSource.author}
            </Descriptions.Item>
            <Descriptions.Item label="创作时间">
              {moment(dataSource.createTime).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="发布时间">
              {dataSource.publishTime
                ? moment(dataSource.publishTime).format("YYYY-MM-DD HH:mm:ss")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="区域">
              {dataSource.region}
            </Descriptions.Item>
            <Descriptions.Item label="审核状态">
              <Tag color={AuditStateColor[dataSource.auditState]}>
                {AuditStateMap[dataSource.auditState]}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="发布状态">
              <Tag color={PublishStateColor[dataSource.publishState]}>
                {PublishStateMap[dataSource.publishState]}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="访问数量">
              <Text type="success">{dataSource.view}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="点赞数量">
              <Text type="success">{dataSource.star}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="评论数量">
              <Text type="success">0</Text>
            </Descriptions.Item>
          </Descriptions>
          <Card>
            <div dangerouslySetInnerHTML={{ __html: dataSource.content }}></div>
          </Card>
        </Space>
      )}
    </>
  );
}
