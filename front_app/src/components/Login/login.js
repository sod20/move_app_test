import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card } from 'antd';
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { Layout} from 'antd'
import 'antd/dist/antd.css';
//import '../index.css';
const { Content} = Layout;

export default function Login({ setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const form_layout = {
        labelCol: { span: 12 },
        wrapperCol: { span: 16 },
    };
    
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    const handleSubmit = async e => {
        const user = {
            'username': username,
            'password': password
        };
        const headers = {
            'Content-Type': 'application/json',
        }
        const token = await axios.post(`http://localhost:8080/authenticate`, user, {headers: headers} )
            .then(resp => resp.data)
        console.log(token);
        setToken(token);
      }
      
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
                            onFinish={handleSubmit}
                            onFinishFailed={onFinishFailed}>
                            <Form.Item
                                label="Username"
                                name="username"
                                onChange={e => setUserName(e.target.value)}
                                rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                onChange={e => setPassword(e.target.value)}
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

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}