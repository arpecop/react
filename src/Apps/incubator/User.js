import React from 'react';

import { Spin } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Header } from './components/UI';
import Item from './components/Item';
import Bottom from './Bottom';
import { env } from './env/constants';
import Top from './Top';
import { useFetch } from './components/useFetch';

const uuid = require('uuid/v4');

const User = ({ user }) => {
  const [data, setData] = useFetch(`${env.api}twitter/_design/api/_view/users?key="${user}"&reduce=false&include_docs=true&limit=200&update=false&descending=true`);

  return (

    <HelmetProvider>
      <Helmet>
        <title>
          {`${user}`}
        </title>
      </Helmet>

      {data && data.rows[0] ? (
        <>
          <Header>
            <img src={`https://avatars.io/twitter/${data.rows[0].doc.screenName}`} size="large" alt="" />
            <h1>{data.rows[0].doc.screenName}</h1>
          </Header>
          <Top />
          <Helmet>
            <title>
              {`${user}`}
            </title>
            <meta name="description" content={`${data.rows[0].doc.screenName} : ${data.rows[0].doc.title}`} />
          </Helmet>
          {data.rows.map((item, i) => (
            <Item key={uuid()} item={item.doc} i={i} />
          ))}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: 20 }}><Spin /></div>
      )}
      <Bottom tag={user} />

    </HelmetProvider>
  );
};

export default User;
