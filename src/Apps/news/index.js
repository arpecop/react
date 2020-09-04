/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import uuid from 'react-uuid';
import { Helmet } from 'react-helmet';

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
  const itemz = (data1) => data1.Items.map(({ title, image, vreme }, i) => (
    <div
      key={vreme}
      style={{
        margin: 'auto',
        padding: 10,
        width: 300,
        backgroundColor: isOdd(i) ? '#d6d9dc' : 'white',
      }}
    >
      <a href={`/${vreme}`}>
        {title}

        <img src={image} style={{ maxWidth: 300 }} alt="" />
      </a>
    </div>
  ));

  return (
    <>
      {isIndex && (
      <div>
        {itemz(data)}
      </div>
      )}
      {match && (
        <>
          <Helmet>
            <title>{article.title}</title>
            <meta name="description" content="Helmet application" />
          </Helmet>
          <h1>{article.title}</h1>
          <img src={article.image} alt={article.title} style={{ maxWidth: '100%' }} />
          {article.content.map(({ key, text }) => (<p key={key}>{text}</p>))}
          източник:
          {article.source}
          {itemz(data)}

        </>
      )}
    </>
  );
};

export default App;