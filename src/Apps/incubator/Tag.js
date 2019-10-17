import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Item from './components/Item';
import { Helmet } from 'react-helmet';
import { Header } from './components/UI';
import Bottom from './Bottom';
const Tag = ({ tag }) => {
  const [data, setData] = useState({ rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://arpecop.serveo.net/proxy/twitter/_design/api/_view/tags?key="' +
          tag +
          '"&reduce=false&include_docs=true&limit=200&update=false',
      );
      setData(result.data);
    };
    fetchData();
  }, [tag]);
  return (
    <div>
      <Header>
        <h1>#{tag}</h1>
      </Header>
      {data.rows[0] ? (
        <Fragment>
          <Helmet>
            <title>
              {data.rows[0].doc.screenName} :{data.rows[0].doc.title}
            </title>
          </Helmet>
          {data.rows.map(item => (
            <Item key={item.key} item={item.doc}></Item>
          ))}
        </Fragment>
      ) : null}
      <Bottom tag={tag}></Bottom>
    </div>
  );
};

export default Tag;
