import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Drawer, List, Row, Space } from "antd";
import axios from "axios";
import * as echarts from "echarts";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const { Meta } = Card;
export default function Home() {
  const [viewList, setViewList] = useState([]);
  const [starList, setStarList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pieChart, setPieChart] = useState(null);
  const [allList, setAllList] = useState([]);

  const chartRef = useRef();
  const pieRef = useRef();

  useEffect(() => {
    axios
      .get(
        "/news?punlishState=2&_expand=categoris&_sort=view&_limit=6&_order=desc"
      )
      .then((res) => {
        setViewList(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "/news?punlishState=2&_expand=categoris&_sort=star&_limit=6&_order=desc"
      )
      .then((res) => {
        setStarList(res.data);
      });
  }, []);
  useEffect(() => {
    axios.get("/news?punlishState=2&_expand=category").then((res) => {
      setAllList(res.data);
      renderBarView(_.groupBy(res.data, (item) => item.category.title));
    });

    return () => {
      window.onresize = null;
    };
  }, []);
  const renderBarView = (dataObj) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(chartRef.current);
    // 绘制图表
    myChart.setOption({
      title: {
        text: "新闻分类图示",
      },
      tooltip: {},
      xAxis: {
        data: Object.keys(dataObj),
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        minInterval: 1,
      },
      series: [
        {
          name: "销量",
          type: "bar",
          data: Object.values(dataObj).map((item) => item.length),
        },
      ],
    });
    window.onresize = function () {
      myChart.resize();
    };
  };
  const renderPieView = () => {
    let currentList = allList.filter((item) => item.author === username);
    let groupObj = _.groupBy(currentList, (item) => item.category.title);
    let list = [];
    for (const key in groupObj) {
      list.push({
        name: key,
        value: groupObj[key].length,
      });
    }
    var myChart;
    if (!pieChart) {
      myChart = echarts.init(pieRef.current);
      setPieChart(myChart);
    } else {
      myChart = pieChart;
    }
    var option;

    option = {
      title: {
        text: "当前用户新闻分类图示",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          name: "发布数量",
          type: "pie",
          radius: "50%",
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  };
  const {
    username,
    region,
    role: { roleName },
  } = JSON.parse(localStorage.getItem("token"));
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              size="small"
              dataSource={viewList}
              renderItem={(item) => (
                <List.Item>
                  <NavLink to={`/news-manage/preview/${item.id}`}>
                    {item.title}
                  </NavLink>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
              size="small"
              dataSource={starList}
              renderItem={(item) => (
                <List.Item>
                  <NavLink to={`/news-manage/preview/${item.id}`}>
                    {item.title}
                  </NavLink>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined
                key="setting"
                onClick={async () => {
                  await setDrawerOpen(true);
                  renderPieView();
                }}
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
              }
              title={username}
              description={
                <>
                  <b>{region || "全球"}</b> {roleName}
                </>
              }
            />
          </Card>
        </Col>
      </Row>
      <Card style={{ width: "100%" }}>
        <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>
      </Card>
      <Drawer
        title="个人新闻分类"
        placement="right"
        width="600px"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <div ref={pieRef} style={{ width: "100%", height: "400px" }}></div>
      </Drawer>
    </Space>
  );
}
