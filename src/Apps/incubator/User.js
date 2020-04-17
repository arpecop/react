import React from 'react';

import { Spin } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import useAxios from 'axios-hooks';
import { Header } from './components/UI';
import Item from './components/Item';
import Bottom from './Bottom';
import { env } from './env/constants';

const uuid = require('uuid/v4');

const User = ({ user }) => {
  const [{ data, loading, error }] = useAxios(
    `${env.api}twitter/_design/api/_view/users?key="${user}"&reduce=false&include_docs=true&limit=200&update=false&descending=true`,
  );
  return (
    <HelmetProvider>
      <Helmet>
        <title>{`${user}`}</title>
      </Helmet>

      {!loading && !error ? (
        <>
          <Header>
            <img
              src={`https://avatars.io/twitter/${data.rows[0].doc.screenName}`}
              size="large"
              alt=""
            />
            <h1>{data.rows[0].doc.screenName}</h1>
          </Header>

          <Helmet>
            <title>{`${user}`}</title>
            <meta
              name="description"
              content={`${data.rows[0].doc.screenName} : ${data.rows[0].doc.title}`}
            />
          </Helmet>
          {data.rows.map((item, i) => (
            <Item key={uuid()} item={item.doc} i={i} />
          ))}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: 20 }}>
          <Spin />
        </div>
      )}
      <Bottom tag={user} />
    </HelmetProvider>
  );
};

export default User;
