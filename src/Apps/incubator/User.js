import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Item from './components/Item';
const User = props => {
  const [data, setData] = useState({ rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://arpecop.serveo.net/proxy/twitter/_design/api/_view/users?key="' +
          props.user +
          '"&reduce=false&include_docs=true&limit=200',
      );
      setData(result.data);
    };
    fetchData();
  }, [props.user]);
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

export default User;
