import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Modal, Switch, Popover } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

export default function RightList() {
  const [modal, contextHolder] = Modal.useModal();
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key) => {
        return <Tag color="orange">{key}</Tag>;
      },
    },
    {
      title: "操作",
      render: (item) => (
        <Space>
          <Button
            danger={true}
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(item)}
          ></Button>
          <Popover
            content={
              <div>
                <Switch
                  checked={item.pagepermisson}
                  onChange={() => onSwitchChange(item)}
                ></Switch>
              </div>
            }
            title="页面配置项"
            trigger={item.pagepermisson === undefined ? "" : "click"}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.pagepermisson === undefined}
            ></Button>
          </Popover>
        </Space>
      ),
    },
  ];

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

  const deleteHandler = (item) => {
    if (item.grade !== 1) {
      let list = dataSource.filter((data) => data.id === item.rightId);
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      axios.delete(`http://localhost:8000/children/${item.id}`);
      setDataSource([...dataSource]);
    } else {
      axios.delete(`http://localhost:8000/rights/${item.id}`);
      setDataSource(dataSource.filter((data) => data.id !== item.id));
    }
  };
  const onSwitchChange = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
    setDataSource([...dataSource]);
    if (item.grade !== 1) {
      axios.patch(`http://localhost:8000/children/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    } else {
      axios.patch(`http://localhost:8000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/rights?_embed=children")
      .then((response) => {
        const list = response.data.map((item) => {
          if (!item.children?.length) {
            item.children = undefined;
          }
          return item;
        });
        setDataSource(list);
      });
  }, []);
  return (
    <div>
      RightList
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 12 }}
      />
    </div>
  );
}
