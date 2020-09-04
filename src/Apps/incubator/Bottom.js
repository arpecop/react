import React from 'react';

import {
  List, Tag, Row, Col, Spin,
} from 'antd';

import { Title } from './components/UI';

const links = [{ id: 1, url: 'https://duh.netlify.com', link: 'Blog' },
  { id: 2, url: 'https://arpecop.xyz', link: 'Вицове' },
  { id: 3, url: 'https://freeteenpicsandmovies.netlify.app', link: 'Free teen pics' },
  { id: 4, url: 'https://rudixlab.com', link: 'DevOps Bulgaria' },
];
const Listx = ({ prefix, rows }) => (
  <div style={{ textAlign: 'center' }}>
    <List
      itemLayout="horizontal"
      dataSource={rows}
      renderItem={(item) => (
        <>

          <a href={`/${prefix}/${item.u}`}>
            <Tag
              style={{
                backgroundColor: '#231f20',
                border: 'none',
                color: '#67d5e4',
                cursor: 'pointer',
                margin: 4,
              }}
            >
              {item.u}
            </Tag>
          </a>

        </>
      )}
    />
  </div>
);

const Bottom = ({ tag, items }) => (
  <div>
    <Row type="flex" justify="center">
      <Col xs={23} sm={20} md={18} lg={10}>
        <Title>Users</Title>
        {items ? <Listx rows={items} prefix="u" /> : <Spin />}

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

export default Bottom;
