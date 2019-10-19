import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './components/Item';

const uuid = require('uuid/v4');

const Tag = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://arpecop.serveo.net/twitter/_design/api/_view/tags?reduce=false&include_docs=true&limit=22&update=false&descending=false',
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <ul>
        {data ? data.rows.map((item) => (
          <Item key={uuid()} item={item.doc} />
        )) : (<div>Loading</div>)}
      </ul>
    </div>
  );
};

export default Tag;
