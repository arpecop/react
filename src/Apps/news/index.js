/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import uuid from 'react-uuid';
import { Helmet } from 'react-helmet';
import { List } from 'antd';

import 'antd/dist/antd.css';
import Links from './links';

// or 'antd/dist/antd.less'
const Row = ({ row }) => {
  if (row.includes('<img')) {
    const regex = /<img.*?src="(.*?)"/;
    const src = regex.exec(row)[1];
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={src} alt="" style={{ maxWidth: '100%' }} />
      </div>
    );
  }
  return (<p>{row}</p>);
};
const Itemz2 = ({ data }) => data.Items.map(({ vreme, title }) => (
  <a href={`/${vreme}`}>
    {title}
  </a>
));
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
          .filter((word) => word.length > 10)
          .map((i) => ({ text: i, key: uuid() })),
      };

      setArticle(articlex);
    };
    if (match) {
      fetchArticle();
    }
    fetchData();
  }, []);

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      {isIndex && (
      <>
        <Itemz data={data} />
        <Itemz2 data={data} />
      </>
      )}
      {match && (
      <>
        <Helmet>
          <title>{article.title}</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <h1 style={{ fontWeight: 'lighter', fontSize: '2rem' }}>
          {article.title}
        </h1>
        <div style={{ textAlign: 'center' }}>
          <img
            src={article.image}
            alt={article.title}
            style={{ maxWidth: '100%', margin: 'auto' }}
          />
        </div>
        {article.content.map(({ key, text }) => (
          <>
            <Row row={text} key={key} />
          </>
        ))}
        източник:
        {article.source}
        <Itemz data={data} />
      </>
      )}
      <Links />
    </div>
  );
};

export default App;
