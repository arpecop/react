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
  const [amazon, setAmazon] = useState([]);
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
  }, [tag]);

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
  }, [tag]);


  return (
    <div>
      <Row type="flex" justify="center">
        <Col xs={24} sm={20} md={18} lg={10}>
          <Title>Users</Title>
          {data ? <Listx rows={data.rows} prefix="u" /> : <Spin />}
          <Title>Tags</Title>
          {data1 ? <Listx rows={data1.rows} prefix="t" /> : <Spin />}

          {amazon[0] ? (
            <div>
              <Title>Marketplace</Title>
              <List
                size="small"
             // header={<div>Header</div>}
             // footer={<div>Footer</div>}
                bordered={false}
                dataSource={amazon}
                renderItem={(item) => (
                  <List.Item>
                    <a style={{ color: '#FFF' }} href={`https://www.amazon.com/gp/product/${item.asin}/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=${item.asin}&linkCode=as2&tag=rudix-20`} target="_top" rel="nofollow">
                      {item.title}

                      {item.discounted ? (
                        <span>
                          <Tag style={{ textDecoration: 'line-through' }}>{`${item.before_discount}$`}</Tag>
                          {' '}
                          <Tag>{`${item.price}$`}</Tag>
                        </span>
                      ) : (<Tag>{`${item.price}$`}</Tag>)}
                    </a>

                  </List.Item>
                )}
              />

            </div>
          ) : null}
        </Col>
      </Row>

    </div>

  );
};

export default Bottom;
