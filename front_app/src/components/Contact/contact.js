import React, { useState } from 'react';
import { render } from 'react-dom';
import { message, Card } from 'antd';
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Table, Tag } from 'antd';
import { Get } from 'react-axios'
import axios from 'axios';
import useToken from '../App/useAuthToken';
import 'antd/dist/antd.css';
import '../../index.css';
const { Header, Content, Footer } = Layout;


const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phones',
    key: 'phones',
  },
];

export default function Contacts () {
    /*return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <Row>
                    <Table dataSource={this.state.tableData} columns={columns} />
                </Row>
            </Content>
        </Layout>
    );*/
    
    const URL = "http://localhost:8080/api/contacts/list";
    const { token, setToken } = useToken();
    const headers = {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*/*",
    };
    console.log(URL);
    console.log(headers)
    const response = axios.get(URL, { headers: headers })
        .then(resp => resp.data)
        .catch((error) => {
            console.log('error ' + error);
        });
    return (<Layout className="layout">
        <Content style={{ padding: '0 50px' }}>
            <Row>
                <Table dataSource={response} columns={columns} />
            </Row>
        </Content>
    </Layout>);
    /*return (
        <div>
          <Get url={URL} headers={headers}>
            {(error, response, isLoading, makeRequest, axios) => {
              if(error) {
                return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
              }
              else if(isLoading) {
                return (<div>Loading...</div>)
              }
              else if(response !== null) {
                  console.log(response);
                    return (
                        <Layout className="layout">
                            <Content style={{ padding: '0 50px' }}>
                                <Row>
                                    <Table dataSource={response.data} columns={columns} />
                                </Row>
                            </Content>
                        </Layout>
                    )
              }
              return (<div>Default message before request is made.</div>)
            }}
          </Get>
    </div>)*/
};