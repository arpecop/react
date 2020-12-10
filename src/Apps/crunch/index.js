import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';

import axios from 'axios';
import uuid from 'react-uuid';
import './main.css';

const fetchx = async (json) => {
  const result = await axios.post(
    'https://rudixlab.herokuapp.com/db/',
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
// or 'antd/dist/antd.less'
function App(props) {
  const { match } = props;
  const [data, setData] = useState({ Items: [] });
  const [article, setArticle] = useState({ content: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchx({
        collection: 'crunch',
        limit: 50,
        descending: false,
        fields: ['title', 'image', 'vreme'],
      });
      setData(result.data);
    };
    fetchData();
    const fetchArticle = async () => {
      const result = await fetchx({
        id: Math.round(match.params.id),
        collection: 'crunch',
        limit: 1,
        descending: true,
      });
      const articlex = {
        ...result.data,
        content: result.data.content
          .map((i) => ({ ...i, key: uuid() })),
        // .fiter((item) => !item.key),
      };
      setArticle(articlex);
    };
    if (match) {
      fetchArticle();
    }
  }, [match]);

  return (
    <div className="container">
      {match && (
      <>
        <Helmet>
          <title>{article.title}</title>
        </Helmet>
        <h1>{article.title}</h1>
        <img src={article.image} alt="" style={{ maxWidth: '100%' }} />
        {article.content.map((row) => (row.node === 'element' && row.child ? (
          <p>{row.child[0].text}</p>
        ) : (
          ''
        )))}
      </>
      )}
      <h1>IT News Bulgaria</h1>
      {data.Items.map(({ image, title, vreme }) => (
        <div key={vreme}>
          <a href={`/${vreme}`} className="item">
            <h2>{title}</h2>
            <img src={image} alt="" />
          </a>
          <hr />
        </div>
      ))}
    </div>
  );
}
export default App;
