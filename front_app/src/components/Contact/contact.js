import React, { useState, useEffect } from "react";
import { Row, Col} from 'antd';
import { Layout } from 'antd';
import { Table,  Tag } from 'antd';
import axios from 'axios';
import useToken from '../App/useAuthToken';
import 'antd/dist/antd.css';
import '../../index.css';
const { Content } = Layout;

export default function Contacts () {
    const [state, setstate] = useState([]);
    const [loading, setloading] = useState(true);
    const [allData, setAllData] = useState([]);
    
    const { token } = useToken();
    useEffect(() => {
        const URL = "http://localhost:8080/api/contacts/list";
        const headers = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Time-executed": new Date(),
        };
        getData(URL, headers);
      }, []);

    const getData = async (URL, headers) => {
        await axios.get(URL, { headers: headers })
            .then(res => {
                console.log(res.data);
                setstate(res.data.data);
                setloading(false);
            })
            .catch((error) => {
                console.log('error ' + error);
        });
    };
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          width: "33%",
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: "33%",
        },
        {
          title: 'Phones',
          dataIndex: 'phones',
          key: 'phones',
          render: phones => (
            <>
              {phones.map(phone => {
                return (
                  <Tag color={'green'} key={phone}>
                    {phone.number.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
          width: "33%",
        },
      ];

    return (
        <div>
          {loading ? (
            "Loading"
          ) : (
            <Content style={{ padding: '0 50px' }}>
                <Row gutter={{ xs: 1, sm: 8, md: 16, lg: 24 }}>
                  <Col className="gutter-row" span={24}>
                    <Table dataSource={state} columns={columns} />
                  </Col>
                </Row>
            </Content>
          )}
        </div>
      );
};