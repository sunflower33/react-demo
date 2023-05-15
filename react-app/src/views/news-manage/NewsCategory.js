import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
const EditableContext = React.createContext(null);
export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  const handleSave = (record) => {
    console.log(record);
    axios
      .patch(`/categories/${record.id}`, {
        title: record.title,
        value: record.value,
      })
      .then((res) => {
        setDataSource(
          dataSource.map((item) => {
            if (item.id === record.id) {
              return {
                id: item.id,
                title: record.title,
                value: record.value,
              };
            }
            return item;
          })
        );
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "栏目名称",
      dataIndex: "title",
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: "title",
        title: "栏目名称",
        handleSave,
      }),
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
      axios.delete(`/children/${item.id}`);
      setDataSource([...dataSource]);
    } else {
      axios.delete(`/rights/${item.id}`);
      setDataSource(dataSource.filter((data) => data.id !== item.id));
    }
  };
  useEffect(() => {
    axios.get("/categories").then((response) => {
      const list = response.data.map((item) => {
        if (!item.children?.length) {
          item.children = undefined;
        }
        return item;
      });
      setDataSource(list);
    });
  }, []);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  return (
    <div>
      新闻分类
      <Table
        components={components}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 12 }}
        rowKey={(item) => item.id}
      />
    </div>
  );
}
