import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import { Helmet } from 'react-helmet';
import { Header } from './components/UI';
import Item from './components/Item';
import Bottom from './Bottom';
const User = props => {
  const [data, setData] = useState({ rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://arpecop.serveo.net/proxy/twitter/_design/api/_view/users?key="' +
          props.user +
          '"&reduce=false&include_docs=true&limit=200&update=false',
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
            <img src={`https://avatars.io/twitter/${data.rows[0].doc.screenName}`} size="large" alt="" />
            <h1>{data.rows[0].doc.screenName}</h1>
          </Header>
          <Helmet>
            <title>
              {data.rows[0].doc.screenName} :{data.rows[0].doc.title}
            </title>
          </Helmet>
          {data.rows.map((item, i) => (
            <Item key={i} item={item.doc}></Item>
          ))}
        </Fragment>
      ) : null}
      <Bottom tag={props.user}></Bottom>
    </div>
  );
};

export default User;
