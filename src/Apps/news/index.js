/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import uuid from 'react-uuid';
import { Helmet } from 'react-helmet';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Links from './links';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar:
         'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

// or 'antd/dist/antd.less'
const Itemz = ({ data }) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 3,
    }}
    dataSource={data.Items}
    renderItem={(item) => (
      <a href={`/${item.vreme}`}>
        <List.Item
          key={item.vreme}
          extra={<img width={272} alt="logo" src={item.image[0]} />}
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      </a>
    )}
  />
);

const fetchx = async (json) => {
  const result = await axios.post(
    'https://rudixlab.com/db/',
    JSON.stringify(json),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return new Promise((resolve) => {
    resolve(result);
  });
};
const App = ({ match, isIndex }) => {
  const [data, setData] = useState({ Items: [] });
  const [article, setArticle] = useState({ content: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchx({
        collection: 'newsbg',
        limit: 50,
        descending: false,
        fields: ['title', 'image', 'vreme'],
      });

      setData(result.data);
    };
    const fetchArticle = async () => {
      const result = await fetchx({
        id: Math.round(match.params.id),
        collection: 'newsbg',
        limit: 1,
        descending: true,
      });
      const articlex = {
        ...result.data,
        content: result.data.content
          .split('\n')
          .filter((word) => word.length > 6)
          .map((i) => ({ text: i, key: uuid() })),
      };

      setArticle(articlex);
    };
    if (match) {
      fetchArticle();
    }
    fetchData();
  }, []);
  const isOdd = (num) => num % 2;

  return (
    <>
      {isIndex && <Itemz data={data} />}
      {match && (
      <>
        <Helmet>
          <title>{article.title}</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <h1>{article.title}</h1>
        <img
          src={article.image}
          alt={article.title}
          style={{ maxWidth: '100%' }}
        />
        {article.content.map(({ key, text }) => (
          <p key={key}>{text}</p>
        ))}
        източник:
        {article.source}
        <Itemz data={data} />
      </>
      )}
      <Links />
    </>
  );
};

export default App;
