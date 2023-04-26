import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import loginStyle from "../asset/css/login.module.scss";

export default function Login() {
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Success:", values);
    axios
      .get(
        `/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
      )
      .then((res) => {
        if (res.data.length === 0) {
          message.error("用户名或密码不匹配");
        } else {
          localStorage.setItem("token", JSON.stringify(res.data[0]));
          history.push("/");
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const pageStyle = {
    background: "rgb(35,39,65)",
    height: "100%",
  };
  return (
    <div style={pageStyle}>
      <div className={loginStyle.loginContainer}>
        <Typography.Title level={2}>登录</Typography.Title>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
