import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Avatar } from 'antd';
import { Helmet } from 'react-helmet';
import { Header } from './components/UI';
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
      {data.rows[0] ? (
        <Fragment>
          <Header>
            <img src={`https://avatars.io/twitter/${data.rows[0].doc.screenName}`} size="large" />
            {data.rows[0].doc.screenName}
          </Header>
          <Helmet>
            <title>
              {data.rows[0].doc.screenName} :{data.rows[0].doc.title}
            </title>
          </Helmet>
        </Fragment>
      ) : null}
      <p></p>
      {data.rows.map(item => (
        <Item key={item.key} item={item.doc}></Item>
      ))}
    </div>
  );
};

export default User;
