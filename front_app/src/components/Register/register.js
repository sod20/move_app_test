import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import { Card, Modal } from 'antd';
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col } from 'antd';
import { Layout} from 'antd'
import 'antd/dist/antd.css';
import parse from 'html-react-parser';
//import '../index.css';
const { Content} = Layout;

export default function Register({setToken}) {

    let history = useHistory();
    const [visible, setVisible] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const form_layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    const handleSubmit = async (registrationData) => {
        const headers = {
            'Content-Type': 'application/json',
        }
        const result = await axios.post(`http://localhost:8080/register`, registrationData, {headers: headers} )
            .then(resp => resp.data)
        console.log(result);
        if (result.code !== 200) {
            var errorsMessage = "<hr/><ul>";
            for (const [key, value] of Object.entries(result.data)) {
                console.log(key + ": " + value);
                errorsMessage += "<li>" + value + "<li/>";
              }
              errorsMessage += "</ul>";
            setModalText('Error al registrar usuario' + errorsMessage);
            showModal();
        } else {
            const token = result.data.token; 
            setToken(token);
            history.push("/contacts");
        }
      }
      
    const homepage = (
        <Content style={{ padding: '0 50px' }}>
            <Row gutter={{ xs: 1, sm: 8, md: 16, lg: 24 }}>
                <Col className="gutter-row" span={4}></Col>
                <Col className="gutter-row" span={16}>
                    <div style={{ margin: '100px auto' }}>
                    <Card title="Register">
                        <Form
                            {...form_layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={handleSubmit}
                            onFinishFailed={onFinishFailed}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input.Password />
                            </Form.Item>

                            <Form.List name="phones">
                                {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{ display: "flex", marginBottom: 8 }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                        {...restField}
                                        name={[name, "number"]}
                                        fieldKey={[fieldKey, "phoneNumber"]}
                                        rules={[{ required: true, message: "Missing first name" }]}
                                        >
                                        <Input placeholder="Phone Number" />
                                        </Form.Item>
                                        <Form.Item
                                        {...restField}
                                        name={[name, "countryCode"]}
                                        fieldKey={[fieldKey, "countryCode"]}
                                        rules={[{ required: true, message: "Missing last name" }]}
                                        >
                                        <Input placeholder="Country Code" />
                                        </Form.Item>
                                        <Form.Item
                                        {...restField}
                                        name={[name, "cityCode"]}
                                        fieldKey={[fieldKey, "cityCode"]}
                                        rules={[{ required: true, message: "Missing last name" }]}
                                        >
                                        <Input placeholder="City Code" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                    ))}
                                    <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Add Phone
                                    </Button>
                                    </Form.Item>
                                </>
                                )}
                            </Form.List>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    </div>
                </Col>
                <Col className="gutter-row" span={4}></Col>
            </Row>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                {parse(modalText)}
            </Modal>
      </Content>
      );
    return (homepage);
  }

Register.propTypes = {
    setToken: PropTypes.func.isRequired
}