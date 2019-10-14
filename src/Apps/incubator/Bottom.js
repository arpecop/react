import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { List, Row, Tag, Badge } from 'antd';
import Item from './components/Item';
const Listx = props => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.rows}
      renderItem={item => (
        <a href={`/${props.prefix}/${item.key}`}>
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

const Bottom = props => {
  const [data, setData] = useState({ rows: [] });
  const [data1, setData1] = useState({ rows: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://arpecop.serveo.net/proxy/twitter/_design/api/_view/users?reduce=true&group=true&limit=50&skip=50&start_key="' +
          props.tag +
          '"',
      );
      const result1 = await axios(
        'https://arpecop.serveo.net/proxy/twitter/_design/api/_view/tags?reduce=true&group=true&limit=50&skip=50&start_key="' +
          props.tag +
          '"',
      );
      setData(result.data);
      setData1(result1.data);
    };
    fetchData();
  }, [props.tag]);
  return (
    <div>
      <Row style={{ textAlign: 'center' }}>
        <h2>Users</h2>
        <Listx rows={data.rows} prefix="u"></Listx>
        <h2>Tags</h2>
        <Listx rows={data1.rows} prefix="t"></Listx>
      </Row>
    </div>
  );
};

export default Bottom;
