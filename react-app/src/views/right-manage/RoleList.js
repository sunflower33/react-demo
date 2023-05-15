import { Button, Modal, Space, Table, Tree } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [currentRights, setCurrentRights] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
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

          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setModalOpen(!isModalOpen);
              setCurrentRights(item.rights);
              setCurrentId(item.id);
            }}
          ></Button>
        </Space>
      ),
    },
  ];
  const deleteHandler = (item) => {
    axios.delete(`/roles/${item.id}`);
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
  const handleOk = () => {
    setModalOpen(false);
    setDataSource(
      dataSource.map((item) => {
        if (item.id === currentId) {
          return {
            ...item,
            rights: currentRights,
          };
        }
        return item;
      })
    );
    axios.patch(`/roles/${currentId}`, {
      rights: currentRights,
    });
  };
  const handleCancel = () => {
    setModalOpen(false);
  };
  const onCheck = (checkedKeys) => {
    setCurrentRights(checkedKeys.checked);
  };
  useEffect(() => {
    axios.get("/roles").then((response) => {
      setDataSource(response.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get("/rights?_embed=children")
      .then((response) => {
        setRightList(response.data);
      });
  }, []);
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
      <Modal
        title="权限分配"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkStrictly={true}
          treeData={rightList}
          onCheck={onCheck}
          checkedKeys={currentRights}
        />
        {/* onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData} */}
      </Modal>
    </div>
  );
}
