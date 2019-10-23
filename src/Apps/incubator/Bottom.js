import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  List, Tag, Spin, Row, Col,
} from 'antd';
import { Title } from './components/UI';

const Listx = ({ prefix, rows }) => (
  <div style={{ textAlign: 'center' }}>
    <List
      itemLayout="horizontal"
      dataSource={rows}
      renderItem={(item) => (
        <a href={`/${prefix}/${item.key}`}>
          <span>
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
            {item.value
              >= 2 ? (
                <Tag
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: -5,
                  }}
                >
                  {`${item.value}`}
                </Tag>
              ) : null}
          </span>
        </a>
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
        `https://rudixauth.herokuapp.com/test/twitter/_design/api/_view/users?reduce=true&group=true&limit=20&skip=20&start_key="${
          tag
        }"&update=false`,
      );

      setData(result.data);
    };
    fetchData();
  }, [tag]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://rudixauth.herokuapp.com/test/twitter/_design/api/_view/tags?reduce=true&group=true&limit=20&skip=20&start_key="${
          tag
        }"&update=false`,
      );

      setData1(result.data);
    };
    fetchData();
  }, [tag]);

  return (
    <div>
      <Row type="flex" justify="center">
        <Col xs={24} sm={20} md={18} lg={10}>
          <Title>Users</Title>
          {data ? <Listx rows={data.rows} prefix="u" /> : <Spin />}
          <Title>Tags</Title>
          {data1 ? <Listx rows={data1.rows} prefix="t" /> : <Spin />}

        </Col>
      </Row>

    </div>

  );
};

export default Bottom;
