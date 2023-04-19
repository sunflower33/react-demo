import { Form, Select, Input } from "antd";
import React, { forwardRef, useEffect, useState } from "react";
const { Option } = Select;
const FormUser = forwardRef((props, ref) => {
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    setIsDisabled(props.isUpdateDisabled);
  }, [props.isUpdateDisabled]);
  return (
    <Form ref={ref} layout="vertical">
      <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="区域" name="region" rules={[{ required: !isDisabled }]}>
        <Select disabled={isDisabled}>
          {props.regionList.map((region) => (
            <Option value={region.title} key={region.id}>
              {region.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="角色" name="roleId" rules={[{ required: true }]}>
        <Select
          onChange={(value) => {
            if (value === 1) {
              setIsDisabled(true);
              ref.current.setFieldsValue({ region: "" });
            } else {
              setIsDisabled(false);
            }
          }}
        >
          {props.roleList.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});
export default FormUser;
