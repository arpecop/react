import React from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Card, Row, Col,
} from 'antd';
import useAxios from 'axios-hooks';
import Item from './components/Item';
import TextFormat from './components/TextFormat';
import { Header } from './components/UI';
import Bottom from './Bottom';
import Top from './Top';
import { env } from './env/constants';

import WrapperBanner from './components/banners';

const uuid = require('uuid/v4');

const Tag = ({ tag }) => {
  // const data1 = useFetch(`https://amazonka.herokuapp.com/insta/${tag}`);
  const [{ data, loading, error }] = useAxios(
    `${env.api}twitter/_design/api/_view/tags?key="${
      tag
    }"&reduce=false&include_docs=true&limit=30&descending=true&update=false`,
  );
  const [{ data1, loading1, error1 }] = useAxios(
    `https://amazonka.herokuapp.com/insta/${tag}`,
  );


  return (
    <HelmetProvider>
      <Header>
        <h1>
          {`#${tag}`}
        </h1>
      </Header>
      <Top />
      { !loading && !error && data ? (
        <>
          <Helmet>
            <title>
              {`#${tag}`}
            </title>
            <meta name="description" content={`${data.rows[0].doc.screenName} : ${data.rows[0].doc.title}`} />
          </Helmet>
          {data.rows.map((item, i) => (
            <Item key={uuid()} item={item.doc} i={i} />
          ))}
        </>
      ) : null}
      {!loading1 && !error1 && data1 ? (
        <>
          {data1.medias.map((item, i) => (
            <Row type="flex" justify="center" key={item.media_id}>
              <Col xs={23} sm={20} md={18} lg={10}>
                {i === 6 || i === 3 || i === 5 ? (<WrapperBanner />) : null}
                <Card
                  style={{ marginBottom: 5, backgroundColor: '#231f20' }}
                  bordered={false}
                  type="inner"
                  cover={(<img alt={item.text} style={{ width: '100%' }} src={item.thumbnail} />)}
                >
                  <span style={{ color: '#FFF' }}>
                    <TextFormat text={item.text} />
                  </span>
                </Card>
              </Col>
            </Row>
          ))}
        </>
      ) : null}
      <Bottom tag={tag} />
    </HelmetProvider>
  );
};

export default Tag;
