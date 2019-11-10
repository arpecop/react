import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List, Tag, Spin, Row, Col,
} from 'antd';
import { env } from './env/constants';

import { Title } from './components/UI';


const Listx = ({ prefix, rows }) => (
  <div style={{ textAlign: 'center' }}>
    <List
      itemLayout="horizontal"
      dataSource={rows}
      renderItem={(item) => (
        <span>
          <a href={`/${prefix}/${item.key}`}>

            <Tag
              style={{
								  backgroundColor: '#231f20',
 				  border: 'none',
								  color: '#67d5e4',
								  cursor: 'pointer',
								  margin: 4,
              }}
            >
              {item.key}
            </Tag>

          </a>
          {item.value >= 2 ? (
            <Tag
              style={{
							  border: 'none',

							  marginLeft: -5,
              }}
            >
              {`${item.value}`}
            </Tag>
          ) : null}
        </span>
      )}
    />
  </div>
);


const Bottom = ({ tag }) => {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${env.api}twitter/_design/api/_view/users?reduce=true&group=true&limit=25&skip=25&start_key="${
          tag
        }"&update=false`,
      );

      setData(result.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${env.api}twitter/_design/api/_view/tags?reduce=true&group=true&limit=25&skip=25&start_key="${
          tag
        }"&update=false`,
      );

      setData1(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Row type="flex" justify="center">
        <Col xs={23} sm={20} md={18} lg={10}>
          <Title>Users</Title>
          {data ? <Listx rows={data.rows} prefix="u" /> : null}
          <Title>Tags</Title>
          {data1 ? <Listx rows={data1.rows} prefix="t" /> : null}


        </Col>
      </Row>
      <div style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        color: '#02bac8',
      }}
      >

RudixLabs © 2019 : the site is not associated or affiliated with Twitter

      </div>
    </div>

  );
};

export default Bottom;
