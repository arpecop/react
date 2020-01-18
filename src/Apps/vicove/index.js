/* eslint-disable no-param-reassign */

import React, { useEffect } from 'react';

import { useImmer } from 'use-immer';
import axios from 'axios';
import {
  List, Button, Row, Col,
} from 'antd';
import { Helmet } from 'react-helmet';
import 'antd/dist/antd.css';

const Footer = ({ lastkey }) => <Button type="primary" icon="right" href={`/${lastkey}`} />;

const App = (props) => {
  const [state, setState] = useImmer({
    firstkey: 0,
    lastkey: 0,
    isLoading: true,
    result: { rows: [] },
    resultAll: { rows: [] },
  });
  const { isIndex, match } = props;
  const query = isIndex ? '' : match.params.id;
  const query1 = isIndex ? '' : `&start_key="${match.params.id}"`;

  useEffect(() => {
    async function mount() {
      const result = await axios(`https://pouchdb.herokuapp.com/jokes/${query}`);
      const resultAll = await axios(`https://pouchdb.herokuapp.com/jokes/_design/api/_view/Разни?limit=20&reduce=false${query1}&skip=1`);
      const measures = await axios(`https://grafix.herokuapp.com/?text=${isIndex ? 'x' : result.data.joke.replace(/\n/g, 'br')}`);
      setState((draft) => {
        draft.firstkey = resultAll.data.rows[0].key;
        draft.lastkey = resultAll.data.rows[resultAll.data.rows.length - 1].key;
        draft.resultAll = resultAll.data;
        draft.result = result.data;
        draft.measures = measures.data;
        draft.isLoading = false;
      });
    }
    mount();
  }, []);
  const {
    isLoading, resultAll, firstkey, lastkey, measures,
  } = state;
  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" loading />
        </div>
      ) : (
        <div>
          {!isIndex ? (
            <Helmet>
              <title>Виц</title>
              <meta property="og:url" content={`https://arpecop.xyz/${match.params.id}`} />
              <meta property="od:description" content={measures.text} />
              <meta property="og:type" content="article" />
              <meta property="og:title" content="🤣 Още Вицове ➡️" />
              <meta
                property="og:image"
                content={`https://grafix.herokuapp.com/${measures.id}.png`}
              />
              <meta property="og:image:width" content={measures.width} />
              <meta property="og:image:height" content={measures.height} />
            </Helmet>
          ) : (<div />)}

          <div style={{ padding: 10 }}>
            <Row type="flex" justify="center" align="top">
              <Col xs={23} sm={20} md={16} lg={15} xl={12}>
                <List
                  size="large"
                  style={{ marginTop: 55 }}
                  footer={<Footer firstkey={firstkey} lastkey={lastkey} />}
                  bordered
                  dataSource={resultAll.rows}
                  renderItem={(item, i) => (
                    <List.Item>
                      <div>


                        {i === 0 ? (
                          <h1 style={{ fontWeight: 100, padding: 0, margin: 0 }}>
                            {item.value.joke.split('\n').map((item, key) => (
                              <span key={key}>
                                {item}
                                <br />
                              </span>
                            ))}
                          </h1>
                        ) : (
                          <h2 style={{ fontWeight: 100, padding: 0, margin: 0 }}>

                            {item.value.joke.split('\n').map((item, key) => (
                              <span key={key}>
                                {item}
                                <br />
                              </span>
                            ))}
                          </h2>
                        )}
                      </div>

                      <div style={{ right: 10 }}>
                        <a
                          className="ant-btn ant-btn-primary ant-btn-round"
                          href={`https://www.facebook.com/sharer/sharer.php?u=https://arpecop.xyz/${item.key}`}
                        >
                            Сподели
                        </a>

                      </div>

                    </List.Item>
                  )}
                />
              </Col>
            </Row>
            <div style={{ height: 120 }} />
            <div style={{
              position: 'fixed', bottom: 0, backgroundColor: '#8e44ad', left: 0,
            }}
            >

              <a href="https://play.google.com/store/apps/details?id=com.rudixlabs.jokes2&hl=en_US">
                <img src="./vicove.png" style={{ float: 'left', width: 100 }} alt="" />
                <h2 style={{ color: '#FFF' }}> Изтегли  Вицове и за Андроид  от Гугъл Плей , над 30000 вица в категории</h2>
              </a>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
