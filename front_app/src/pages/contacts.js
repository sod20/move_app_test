import React, { useState } from 'react';
import { render } from 'react-dom';
import { message, Card } from 'antd';
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Table, Tag } from 'antd';
import { Get } from 'react-axios'

import 'antd/dist/antd.css';
import '../index.css';
const { Header, Content, Footer } = Layout;


const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'password',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
];

const Contacts = () => {
    /*return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <Row>
                    <Table dataSource={this.state.tableData} columns={columns} />
                </Row>
            </Content>
        </Layout>
    );*/
    return (
        <div>
          <Get url="http://localhost:8080/contacts/list">
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
    </div>)
};

export default Contacts;