import { Card, Col, List, Row } from "antd";
import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";

export default function News() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category").then((res) => {
      console.log(res);
      const list = Object.entries(
        _.groupBy(res.data, (item) => item.category.title)
      );

      setDataSource(list);
    });
  }, []);
  return (
    <div>
      <PageHeader title="全球大新闻" subTitle="查看新闻"></PageHeader>
      <Row gutter={[16, 16]}>
        {dataSource.map((item) => {
          return (
            <Col span={8} key={item[0]}>
              <Card title={item[0]} bordered={true}>
                <List
                  size="small"
                  dataSource={item[1]}
                  pagination={{ pageSize: 3 }}
                  renderItem={(item) => (
                    <List.Item>
                      <NavLink to={`/detail/${item.id}`}>
                        {item.title}
                      </NavLink>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
