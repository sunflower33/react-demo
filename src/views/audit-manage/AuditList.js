import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

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
        return auditState;
      },
    },
    {
      title: "操作",
      render: (item) => (
        <Space>
          <Button
            type="primary"
            disabled={item.default}
            onClick={() => handleCheck(item)}
          >发布</Button>
        </Space>
      ),
    },
  ];

  const deleteHandler = (item) => {
    axios.delete(`/news/${item.id}`);
    setDataSource(dataSource.filter((data) => data.id !== item.id));
  };
  const onDelete = (item) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "你确定要删除吗？",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        deleteHandler(item);
      },
    });
  };
  const handleUpdate = (item) => {
    props.history.push(`/news-manage/update/${item.id}`);
  };

  const handleCheck = (item) => {
    axios
      .patch(`/news/${item.id}`, {
        auditState: 1,
      })
      .then(() => {
        props.history.push(`/audit-manage/list`);
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
