import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { Header } from './components/UI';
import Item from './components/Item';
import Bottom from './Bottom';
import { post } from './components/useFetch';

const uuid = require('uuid/v4');

const User = ({ user }) => {
  const [data, setData] = useState({ tweets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const getId = await post({
        collection: 't',
        limit: 1,
        query: { u: user },
      });

      const result = await axios(
        `https://rudixlab.com/t/${getId.data.vreme}/${user}/?format=json`,
      );
      console.log(result.data.tweets);
      setData(result.data);
    };

    fetchData();
  }, []);
  return (
    <HelmetProvider>
      <Helmet>
        <title>{`${user}`}</title>
      </Helmet>

      {data ? (
        <>
          <Header>
            <img
              src={`https://avatars.io/twitter/${user}`}
              size="large"
              alt=""
            />
            <h1>{user}</h1>
          </Header>

          <Helmet>
            <title>{`${user}`}</title>

          </Helmet>

        </>
      ) : (
        <div style={{ textAlign: 'center', padding: 20 }}>
          <Spin />
        </div>
      )}
      {data.tweets.map((item, i) => (<Item user={user} key={uuid()} item={item} i={i} />))}

      <Bottom tag={user} />
    </HelmetProvider>
  );
};

export default User;
