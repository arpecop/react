import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Spin } from 'antd';
import Item from './components/Item';
import { Header } from './components/UI';
import Bottom from './Bottom';

const uuid = require('uuid/v4');

const Tag = ({ tag }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://rudixauth.herokuapp.com/test/twitter/_design/api/_view/tags?key="${
          tag
        }"&reduce=false&include_docs=true&limit=200&update=false&descending=true`,
      );
      setData(result.data);
    };
    fetchData();
  }, [tag]);
  return (
    <HelmetProvider>
      <Header>
        <h1>
          {`#${tag}`}
        </h1>
      </Header>

      {data && data.rows ? (
        <>
          <Helmet>
            <title>
              {`#${tag}`}
            </title>
            <meta name="description" content={`${data.rows[0].doc.screenName} : ${data.rows[0].doc.title}`} />
          </Helmet>
          {data.rows.map((item) => (
            <Item key={uuid()} item={item.doc} />
          ))}
        </>
      ) : (
        <div style={{ textAlign: 'center' }}><Spin /></div>
      )}
      <Bottom tag={tag} />
    </HelmetProvider>
  );
};

export default Tag;
