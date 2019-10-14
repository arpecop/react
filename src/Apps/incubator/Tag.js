import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './components/Item';
import { Helmet } from 'react-helmet';
const Tag = ({ tag }) => {
  const [data, setData] = useState({ rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://arpecop.serveo.net/proxy/twitter/_design/api/_view/tags?key="' +
          tag +
          '"&reduce=false&include_docs=true&limit=200',
      );
      setData(result.data);
    };
    fetchData();
  }, [tag]);
  return (
    <div>
      {data.rows[0] ? (
        <Helmet>
          <title>
            {data.rows[0].doc.screenName} :{data.rows[0].doc.title}
          </title>
        </Helmet>
      ) : null}
      {data.rows.map(item => (
        <Item key={item.key} item={item.doc}></Item>
      ))}
    </div>
  );
};

export default Tag;
