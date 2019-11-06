import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Input, Row, Col, List, Avatar,
} from 'antd';
import { env } from './env/constants';

const { Search } = Input;

const Top = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${env.api}twitter/_design/api/_view/tags?reduce=true&group=true&limit=5&start_key="${query}"&update=false`,
      );
      setData(result.data);
    };
    if (query && query.length >= 3) {
      fetchData();
    } else {
      setData(null);
    }
  }, [query]);

  return (
    <Row type="flex" justify="center">

      <Col xs={23} sm={20} md={18} lg={10} style={{ marginBottom: 20 }}>
        <Search
          placeholder="search for users or tags"
          onChange={(e) => setQuery(e.target.value)}
          style={{ color: '#FFF' }}
        />
        {data ? (
          <List
            itemLayout="horizontal"
            dataSource={data.rows}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={(
                    <Avatar
                      src={`https://avatars.io/twitter/${item.key}`}
                      size="large"
                    />
)}
                  title={(
                    <a
                      href={`/u/${item.key}`}
                      style={{
											  color: '#FFF',
                      }}
                    >
                      {item.key}
                    </a>
)}
                />
              </List.Item>
            )}
          />
        ) : null}
      </Col>
    </Row>
  );
};
export default Top;
