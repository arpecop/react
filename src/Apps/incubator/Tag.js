import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Spin } from 'antd';
import Item from './components/Item';
import { Header } from './components/UI';
import Bottom from './Bottom';

const uuid = require('uuid/v4');

const Tag = ({ tag }) => {
  const [data, setData] = useState({ rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://arpecop.serveo.net/proxy/twitter/_design/api/_view/tags?key="${
          tag
        }"&reduce=false&include_docs=true&limit=200&update=false&descending=true`,
      );
      setData(result.data);
    };
    fetchData();
  }, [tag]);
  return (
    <div>
      <Header>
        <h1>
          {`#${tag}`}
        </h1>
      </Header>
      {data.rows[0] ? (
        <>
          <Helmet>
            <title>
              {`${data.rows[0].doc.screenName} : ${data.rows[0].doc.title}`}
            </title>
          </Helmet>
          {data.rows.map((item) => (
            <Item key={uuid()} item={item.doc} />
          ))}
        </>
      ) : (
        <Spin />
      )}
      <Bottom tag={tag} />
    </div>
  );
};

export default Tag;
