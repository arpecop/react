import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Spin, Card, Row, Col,
} from 'antd';
import Item from './components/Item';
import { Header } from './components/UI';
import Bottom from './Bottom';
import Top from './Top';
import { env } from './env/constants';

const uuid = require('uuid/v4');

const Tag = ({ tag }) => {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${env.api}twitter/_design/api/_view/tags?key="${
          tag
        }"&reduce=false&include_docs=true&limit=30&descending=true&update=false`,
      );
      setData(result.data);
    };
    fetchData();
  }, [tag]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://amazonka.herokuapp.com/insta/${tag}`,
      );
      console.log(result.data);
      setData1(result.data);
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
      <Top />
      {data && data.rows ? (
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
      ) : (
        <div style={{ textAlign: 'center' }}><Spin /></div>
      )}
      {data1 && data1.medias ? (
        <>
          {data1.medias.map((item) => (
            <Row type="flex" justify="center" key={item.media_id}>
              <Col xs={23} sm={20} md={18} lg={10}>
                <Card
                  style={{ marginBottom: 5, backgroundColor: '#231f20' }}
                  bordered={false}
                  type="inner"
                  cover={(<img alt="" style={{ width: '100%' }} src={item.thumbnail} />)}
                >

                  <span style={{ color: '#FFF' }}>{item.text}</span>

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
