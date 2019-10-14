import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Item from './components/Item';
const Tag = props => {
  const [data, setData] = useState({ rows: [] });
  const [query, setQuery] = useState('redux');
  console.log(props);
  const [url, setUrl] = useState(
    'https://arpecop.serveo.net/proxy/twitter/_design/api/_view/tags?key="' +
      props.tag +
      '"&reduce=false&include_docs=true&limit=200',
  );
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setData(result.data);
    };
    fetchData();
  }, [url]);
  return (
    <div>
      <ul>
        {data.rows.map(item => (
          <Item key={item.key} item={item.doc}></Item>
        ))}
      </ul>
    </div>
  );
};

export default Tag;
