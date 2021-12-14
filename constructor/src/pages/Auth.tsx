import { Button, Form, Input, message } from "antd";
import API from "api/index";
import axios from "axios";
import { ReactElement, useEffect } from "react";
import { useHistory } from "react-router";
import "./Auth.sass";

const Auth = (): ReactElement => {
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);

  const onFinish = (values: { identifier: string; password: string }) => {
    console.log("Success:", values);
    API.auth.login(values).then((response) => {
      localStorage.setItem("token", response.jwt);
      axios.defaults.headers.authorization = `Bearer ${response.jwt}`;
      message.success("nice, loging");
      history.push("/");
    });
  };

  return (
    <div className="page page-auth">
      <h1>Fibber login:</h1>
      <Form name="basic" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="identifier"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
