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
          <Button
            type="primary"
            disabled={item.default}
            onClick={() => handleAudit(item,2,1)}
          >
            通过
          </Button>
          <Button
            type="primary"
            danger
            disabled={item.default}
            onClick={() => handleAudit(item,3,0)}
          >
            驳回
          </Button>
        </Space>
      ),
    },
  ];

  const handleAudit = (item,auditState,publishState) => {
    axios
      .patch(`/news/${item.id}`, {
        auditState,
        publishState,
      })
      .then(() => {
        setDataSource(dataSource.filter((data) => data.id !== item.id));
        notification.info({
          message: "通知",
          description: `您可以到【审核管理/审核列表】中查看您的新闻`,
          placement: "topRight",
        });
      });
  };

  useEffect(() => {
    const { roleId, username, region } = JSON.parse(
      localStorage.getItem("token")
    );
    const roleMap = {
      superAdmin: 1,
      admin: 2,
      editor: 3,
    };
    axios
      .get(`/news?auditState=1&author=${username}&_expand=category`)
      .then((response) => {
        const list = response.data;
        setDataSource(
          roleMap.superAdmin === roleId
            ? list
            : [
                ...list.filter((item) => item.author === username),
                ...list.filter(
                  (item) =>
                    item.region === region && roleMap.editor === item.roleId
                ),
              ]
        );
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
