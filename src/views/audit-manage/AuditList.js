import { Button, notification, Space, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { AuditStateColor, AuditStateMap } from "../../config/enum";

export default function UserList(props) {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => {
        return (
          <NavLink to={`/news-manage/preview/${item.id}`}>{title}</NavLink>
        );
      },
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "新闻分类",
      dataIndex: "category",
      render: (category) => {
        return category.title;
      },
    },
    {
      title: "审核状态",
      dataIndex: "auditState",
      render: (auditState) => {
        return (
          <Tag color={AuditStateColor[auditState]}>
            {AuditStateMap[auditState]}
          </Tag>
        );
      },
    },
    {
      title: "操作",
      render: (item) => (
        <Space>
          {item.auditState === 1 && (
            <Button
              type="primary"
              danger
              disabled={item.default}
              onClick={() => handleRevert(item)}
            >
              撤销
            </Button>
          )}
          {item.auditState === 2 && (
            <Button
              type="primary"
              disabled={item.default}
              onClick={() => handlePublish(item)}
            >
              发布
            </Button>
          )}
          {item.auditState === 3 && (
            <Button
              type="primary"
              disabled={item.default}
              onClick={() => handleUpdate(item)}
            >
              更新
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleRevert = (item) => {
    axios
      .patch(`/news/${item.id}`, {
        auditState: 0,
      })
      .then(() => {
        setDataSource(dataSource.filter((data) => data.id !== item.id));
        notification.info({
          message: "通知",
          description: `您可以到${"草稿箱"}中查看您的新闻`,
          placement: "topRight",
        });
      });
  };
  const handleUpdate = (item) => {
    props.history.push(`/news-manage/update/${item.id}`);
  };
  const handlePublish = (item) => {
    axios
      .patch(`/news/${item.id}`, {
        publishState: 1,
        publishTime: Date.now(),
      })
      .then(() => {
        setDataSource(dataSource.filter((data) => data.id !== item.id));
        notification.info({
          message: "通知",
          description: `您可以到【发布管理/已发布】中查看您的新闻`,
          placement: "topRight",
        });
        props.history.push(`/publish-manage/published/${item.id}`);
      });
  };

  useEffect(() => {
    const { username } = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        `/news?auditState_ne=0&publishState_lte=1&author=${username}&_expand=category`
      )
      .then((response) => {
        const list = response.data;
        setDataSource(list);
      });
  }, []);

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
    </>
  );
}
