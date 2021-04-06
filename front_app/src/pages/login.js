import React, { useState } from 'react';
import { Card } from 'antd';
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { Layout} from 'antd'
import 'antd/dist/antd.css';
import '../index.css';
const { Content} = Layout;

const Login = () => {
    const form_layout = {
        labelCol: { span: 12 },
        wrapperCol: { span: 16 },
      };
    
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
      
      const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      
    const homepage = (
        <Content style={{ padding: '0 50px' }}>
            <Row gutter={{ xs: 1, sm: 8, md: 16, lg: 24 }}>
                <Col className="gutter-row" span={4}></Col>
                <Col className="gutter-row" span={16}>
                    <div style={{ margin: '100px auto' }}>
                    <Card title="LOG IN">
                        <Form
                            {...form_layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}>
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
                <Col className="gutter-row" span={4}></Col>
            </Row>
      </Content>
      );
    return (homepage);
  }

export default Login;
  