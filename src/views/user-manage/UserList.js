import { Button, Modal, Space, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import FormUser from "../../components/manage-user/FormUser";

export default function UserList() {
  const [dataSource, setDataSource] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);
  const addForm = useRef();
  const updateForm = useRef();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "区域",
      dataIndex: "region",
      filters: [
        ...regionList.map((item) => {
          return { text: item.title, value: item.value };
        }),
        { text: "全球", value: "全球" },
      ],
      onFilter: (value, item) => {
        if (value === "全球") {
          return item.region === "";
        } else {
          return item.region === value;
        }
      },
      render(region) {
        return region || "全球";
      },
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render(role) {
        return role.roleName;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render(roleState, row) {
        return (
          <Switch
            checked={roleState}
            disabled={row.default}
            onChange={() => handleRoleStateChange(row)}
          ></Switch>
        );
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
            disabled={item.default}
            onClick={() => onDelete(item)}
          ></Button>

          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            disabled={item.default}
            onClick={() => handleUpdate(item)}
          ></Button>
        </Space>
      ),
    },
  ];

  const deleteHandler = (item) => {
    axios.delete(`/users/${item.id}`);
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
    setIsAddVisible(false);
    addForm.current
      .validateFields()
      .then((value) => {
        axios
          .post(`/users`, {
            ...value,
            roleState: true,
            default: false,
          })
          .then((response) => {
            addForm.current.resetFields();
            setDataSource([
              {
                ...response.data,
                role: roleList.filter(
                  (item) => item.id === response.data.roleId
                )[0],
              },
              ...dataSource,
            ]);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleCancel = () => {
    setIsAddVisible(false);
  };
  const handleRoleStateChange = (item) => {
    item.roleState = !item.roleState;
    setDataSource([...dataSource]);
    axios.patch(`/users/${item.id}`, {
      roleState: item.roleState,
    });
  };

  const handleUpdate = (item) => {
    setIsUpdateVisible(true);
    setTimeout(() => {
      setCurrentUser(item);
      if (item.roleId === 1) {
        setIsUpdateDisabled(true);
      } else {
        setIsUpdateDisabled(false);
      }
      updateForm.current.setFieldsValue(item);
    });
  };
  const handleUpdateOk = () => {
    updateForm.current
      .validateFields()
      .then((value) => {
        axios
          .patch(`/users/${currentUser.id}`, {
            ...currentUser,
            ...value,
          })
          .then(() => {
            setIsUpdateVisible(false);
            updateForm.current.resetFields();
            setDataSource([
              ...dataSource.map((item) => {
                if (item.id === currentUser.id) {
                  return {
                    ...item,
                    ...value,
                    role: roleList.filter(
                      (roleItem) => roleItem.id === value.roleId
                    )[0],
                  };
                } else {
                  return item;
                }
              }),
            ]);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleUpdateCancel = () => {
    setIsUpdateVisible(false);
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
    axios.get("/users?_expand=role").then((response) => {
      const list = response.data;
      setDataSource(
        roleMap.superAdmin === roleId
          ? list
          : [
              ...list.filter((item) => item.usename === username),
              ...list.filter(
                (item) =>
                  item.region === region && roleMap.editor === item.roleId
              ),
            ]
      );
    });
  }, []);
  useEffect(() => {
    axios.get("/regions").then((response) => {
      setRegionList(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/roles").then((response) => {
      setRoleList(response.data);
    });
  }, []);
  return (
    <>
      <Button type="primary" onClick={() => setIsAddVisible(true)}>
        添加用户
      </Button>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
      <Modal
        title="添加用户"
        open={isAddVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormUser ref={addForm} regionList={regionList} roleList={roleList} />
      </Modal>
      <Modal
        title="更新用户"
        open={isUpdateVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <FormUser
          ref={updateForm}
          regionList={regionList}
          roleList={roleList}
          isUpdateDisabled={isUpdateDisabled}
          isUpdate={true}
        />
      </Modal>
    </>
  );
}
