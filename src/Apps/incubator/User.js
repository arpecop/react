import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { Header } from './components/UI';
import Item from './components/Item';
import Bottom from './Bottom';
import { post } from './components/useFetch';

const uuid = require('uuid/v4');

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const User = ({ user }) => {
  const [data, setData] = useState({ tweets: [] });
  const [random, setRandom] = useState({ Items: [] });
  const [url, setUrl] = useState('');
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
      setUrl(`https://rudixlab.com/t/${getId.data.vreme}/${user}/`);
      const getSimilar = await post({
        collection: 't',
        id: getRandom(1593543944006, 1594365665452),
        limit: 20,
        descending: true,
      });

      setRandom(getSimilar.data);
      setData(result.data);
    };

    fetchData();
  }, []);
  return (
    <HelmetProvider>
      <Helmet>
        <title>{`${user}`}</title>
        <meta name="keywords" content="" />
      </Helmet>

      {data ? (
        <>
          <Header>

            <a href={url}><h1>{user}</h1></a>
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

      <Bottom tag={user} items={random.Items} />
    </HelmetProvider>
  );
};

export default User;
