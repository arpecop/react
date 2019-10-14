import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, Row, Tag, Badge, Layout } from 'antd';
import { Title } from './components/UI';
const { Content } = Layout;

const Listx = ({ prefix, rows }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={rows}
      renderItem={item => (
        <a href={`/${prefix}/${item.key}`}>
          <Badge
            count={item.value > 1 ? item.value : 0}
            style={{
              backgroundColor: '#95a5a6',
              border: 'none',
            }}
          >
            <Tag style={{ color: '#252425' }}>{item.key}</Tag>
          </Badge>
        </a>
      )}
    />
  );
};

const Bottom = ({ tag }) => {
  const [data, setData] = useState({ rows: [] });
  const [data1, setData1] = useState({ rows: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://arpecop.serveo.net/proxy/twitter/_design/api/_view/users?reduce=true&group=true&limit=20&skip=20&start_key="' +
          tag +
          '"',
      );
      const result1 = await axios(
        'https://arpecop.serveo.net/proxy/twitter/_design/api/_view/tags?reduce=true&group=true&limit=20&skip=20&start_key="' +
          tag +
          '"',
      );
      setData(result.data);
      setData1(result1.data);
    };
    fetchData();
  }, [tag]);
  return (
    <div>
      <div style={{ width: '70%', margin: 'auto' }}>
        <Title>Users</Title>
        <Listx rows={data.rows} prefix="u"></Listx>
      </div>
      <div style={{ width: '70%', margin: 'auto' }}>
        <Title>Tags</Title>

        <Listx rows={data1.rows} prefix="t"></Listx>
      </div>
    </div>
  );
};

export default Bottom;
