import React from 'react';

import {
  List, Tag, Row, Col, Spin,
} from 'antd';
import { env } from './env/constants';

import { Title } from './components/UI';
import { useFetch } from './components/useFetch';

const links = [{ id: 1, url: 'https://duh.netlify.com', link: 'Blog' },
  { id: 2, url: 'https://arpecop.xyz', link: 'Вицове' },
  { id: 3, url: 'https://freeteenpicsandmovies.netlify.app', link: 'Free teen pics' },
];
const Listx = ({ prefix, rows }) => (
  <div style={{ textAlign: 'center' }}>
    <List
      itemLayout="horizontal"
      dataSource={rows}
      renderItem={(item) => (
        <span>
          <a href={`https://incubator.netlify.app/${prefix}/${item.key}`}>
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
  const data1 = useFetch(`${env.api}twitter/_design/api/_view/tags?reduce=true&group=true&limit=25&skip=25&start_key="${tag}"&update=false`);
  const data = useFetch(`${env.api}twitter/_design/api/_view/users?reduce=true&group=true&limit=25&skip=25&start_key="${tag}"&update=false`);
  return (
    <div>
      <Row type="flex" justify="center">
        <Col xs={23} sm={20} md={18} lg={10}>
          <Title>Users</Title>
          {data ? <Listx rows={data.rows} prefix="u" /> : <Spin />}
          <Title>Tags</Title>
          {data1 ? <Listx rows={data1.rows} prefix="t" /> : <Spin />}
          <Title>Links</Title>
          {links.map((item) => (
            <a href={item.url} key={item.id}>

              <Tag
                style={{
                  backgroundColor: '#231f20',
                  border: 'none',
                  color: '#67d5e4',
                  cursor: 'pointer',
                  margin: 4,
                }}
              >
                {item.link}
              </Tag>
            </a>
          ))}
        </Col>
      </Row>
    </div>

  );
};

export default Bottom;
