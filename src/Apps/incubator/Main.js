import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './components/Item';

const uuid = require('uuid/v4');

const Tag = () => {
  const [data, setData] = useState({ rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://arpecop.serveo.net/proxy/twitter/_design/api/_view/tags?reduce=false&include_docs=true&limit=22&update=false&descending=true',
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <ul>
        {data.rows.map((item) => (
          <Item key={uuid()} item={item.doc} />
        ))}
      </ul>
    </div>
  );
};

export default Tag;
