import React, { useState } from 'react';
import { render } from 'react-dom';
import { message, Card } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
const { Header, Content, Footer } = Layout;

const App = () => {
  const form_layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [date, setDate] = useState(null);
  
  const handleChange = value => {
    message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    setDate(value);
  };
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
          <div style={{ margin: '100px auto' }}>
            <Card title="LOG IN">
            <Form
              {...form_layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
              </Form.Item>
            </Form>
            </Card>
          </div>
          </Col>
          <Col span={8}> </Col>
        </Row>
      </Content>
    </Layout>
  );
};

render(<App />, document.getElementById('root'));