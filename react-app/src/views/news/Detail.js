import { ArrowLeftOutlined, HeartTwoTone } from "@ant-design/icons";
import { Card, Descriptions, Space, Typography } from "antd";
import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
const { Text } = Typography;

export default function Detail(props) {
    
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    axios
      .get(`/news/${props.match.params.id}?_expand=role&_expand=category`)
      .then((res) => {
        setDataSource({
          ...res.data,
          view: res.data.view + 1,
        });
        return res.data;
      })
      .then((res) => {
        axios.patch(`/news/${props.match.params.id}`, {
          view: res.view + 1,
        });
      });
  }, [props.match.params.id]);

  const handleStar = () => {
    setDataSource({
      ...dataSource,
      star: dataSource.star + 1,
    });
    axios.patch(`/news/${props.match.params.id}`, {
      star: dataSource.star + 1,
    });
  };

  return (
    <>
      {dataSource && (
        <Space direction="vertical" style={{ padding: "20px" }}>
          <PageHeader
            left={<ArrowLeftOutlined onClick={() => props.history.goBack()} />}
            title={dataSource.title}
            subTitle={
              <>
                {dataSource.category.title}{" "}
                <HeartTwoTone
                  twoToneColor="#eb2f96"
                  onClick={() => handleStar()}
                />
              </>
            }
          ></PageHeader>

          <Descriptions size="small" column={3}>
            <Descriptions.Item label="创作者">
              {dataSource.author}
            </Descriptions.Item>
            <Descriptions.Item label="发布时间">
              {dataSource.publishTime
                ? moment(dataSource.publishTime).format("YYYY-MM-DD HH:mm:ss")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="区域">
              {dataSource.region}
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
