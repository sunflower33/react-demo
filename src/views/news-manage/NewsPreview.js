import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Descriptions, Space, Typography } from "antd";
import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";

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

  const auditStateMap = {
    0: "未审核",
    1: "审核中",
    2: "已通过",
    3: "未通过",
  };
  const publishStateMap = {
    0: "未发布",
    1: "待发布",
    2: "已上线",
    3: "已下线",
  };

  return (
    <>
      {dataSource && (
        <Space direction="vertical">
          <PageHeader
            left={<ArrowLeftOutlined onClick={()=>props.history.goBack()} />}
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
              <Text type="danger">{auditStateMap[dataSource.auditState]}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="发布状态">
              <Text type="danger">
                {publishStateMap[dataSource.publishState]}
              </Text>
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
