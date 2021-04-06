import React, { useState } from 'react';
import { render } from 'react-dom';
import { message, Card } from 'antd';
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Table, Tag } from 'antd';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

import 'antd/dist/antd.css';
import '../index.css';
const { Header, Content, Footer } = Layout;


const columns = [
  {
    title: 'Id',
    dataIndex: 'key',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];


const getUsersData() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    console.log(res.data)
    this.setState({loading:false, users: res.data})
}

componentDidMount(){
    this.getUsersData()
}

const Contacts = () => {
    axios.get('http://private-9ff5e-stackoverflow.apiary-mock.com/questions', {
        responseType: 'json'
    }).then(response => {
        this.setState({ tableData: response.data });
    });

    /*
    render() {
  return (
    <div>
      <Get url="/api/user" params={{id: "12345"}}>
        {(error, response, isLoading, makeRequest, axios) => {
          if(error) {
            return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
          }
          else if(isLoading) {
            return (<div>Loading...</div>)
          }
          else if(response !== null) {
            return (<div>{response.data.message} <button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</button></div>)
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get>
    </div>
  )
}
    */
    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <Row>
                    <Table dataSource={this.state.tableData} columns={columns} />
                </Row>
            </Content>
        </Layout>
    );
};

export default Contacts;