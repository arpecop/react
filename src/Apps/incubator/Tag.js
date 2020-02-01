import React from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import useAxios from 'axios-hooks';
import Item from './components/Item';

import { Header } from './components/UI';
import Bottom from './Bottom';
import Top from './Top';
import { env } from './env/constants';


const uuid = require('uuid/v4');

const Tag = ({ tag }) => {
  const [{ data, loading, error }] = useAxios(
    `${env.api}twitter/_design/api/_view/tags?key="${tag}"&reduce=false&include_docs=true&limit=30&descending=true&update=false`,
  );

  return (
    <HelmetProvider>
      <Header>
        <h1>{`#${tag}`}</h1>
      </Header>
      <Top />
      {!loading && !error && data.rows ? (
        <>
          <Helmet>
            <title>{`#${tag}`}</title>
            <meta
              name="description"
              content={`${data.rows[0].doc.screenName} : ${data.rows[0].doc.title}`}
            />
          </Helmet>
          {data.rows.map((item, i) => (
            <Item key={uuid()} item={item.doc} i={i} />
          ))}
        </>
      ) : null}


      <Bottom tag={tag} />
    </HelmetProvider>
  );
};

export default Tag;
