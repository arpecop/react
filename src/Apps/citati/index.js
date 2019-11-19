import React, { useEffect } from 'react';

import { useImmer } from 'use-immer';
import axios from 'axios';
import {
  List, Button, Row, Col,
} from 'antd';
import { Helmet } from 'react-helmet';


import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


const Footer = ({ lastkey }) => <Button type="primary" icon="right" href={`/${lastkey}`} />;


function App(props) {
  const [person, updatePerson] = useImmer({
    firstkey: 0,
    lastkey: 0,
    isLoading: true,
    result: { rows: [] },
    resultAll: { rows: [] },
  });
  const { isIndex, match } = props;
  const query = isIndex ? '' : `&key="${match.params.id}"&skip=0`;
  const query1 = isIndex ? '' : `&start_key="${match.params.id}"&skip=1`;
  console.log(query);
  useEffect(() => {
    async function mount() {
      const result = await axios(`https://pouchdb.herokuapp.com/quotes/_all_docs?include_docs=true&${query}`);
      const resultAll = await axios(`https://pouchdb.herokuapp.com/quotes/_all_docs?include_docs=true&limit=20${query1}`);
      updatePerson((draft) => {
        draft.firstkey = resultAll.data.rows[0].key;
        draft.lastkey = resultAll.data.rows.reverse()[0].key;
        draft.resultAll = { rows: [result.data.rows[0], ...resultAll.data.rows] };
        draft.result = result.data;
        draft.isLoading = false;
      });
    }
    mount();
  }, []);
  const {
    isLoading, result, resultAll, firstkey, lastkey,
  } = person;
  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" loading />
        </div>
      ) : (
        <div>
          <Helmet>
            <title>{result.rows[0].doc.text}</title>
            <meta property="og:url" content={`https://citati.netlify.com/${result.rows[0].key}`} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={result.rows[0].doc.text} />

            <meta
              property="og:image"
              content={`https://grafix.herokuapp.com/tw/?db=quotes&id=${result.rows[0].doc._id}`}
            />
            <meta property="og:image:width" content="617" />
            <meta property="og:image:height" content="324" />
            <meta property="fb:app_id" content="770341770061627" />
            <script type="text/javascript" src="//st-n.ads1-adnow.com/js/a.js" />
          </Helmet>
          <div style={{ padding: 10 }}>
            <Row type="flex" justify="center" align="top">
              <Col xs={23} sm={20} md={16} lg={15} xl={12}>
                <div
                  style={{
                    position: 'fixed',
                    padding: 10,
                    backgroundColor: '#FFF',
                    left: 0,
                    top: 0,
                    width: '100%',
                    zIndex: 100,
                  }}
                >
                    citati.netlify.com

                </div>
                <List
                  size="large"
                  style={{ marginTop: 55 }}
                  footer={<Footer firstkey={firstkey} lastkey={lastkey} />}
                  bordered
                  dataSource={resultAll.rows}
                  renderItem={(item, i) => (
                    <List.Item>
                      <div style={{ marginRight: 90 }}>
                        {i === 3 ? <h2>Ad</h2> : null}

                        {i === 0 ? (
                          <h1 style={{ fontWeight: 100, padding: 0, margin: 0 }}>
                            {item.doc.text}
                          </h1>
                        ) : (
                          <h2 style={{ fontWeight: 100, padding: 0, margin: 0 }}>
                            {item.doc.text}
                          </h2>
                        )}
                      </div>
                      <div id="SC_TBlock_508143" className="SC_TBlock" />
                      <div style={{ position: 'absolute', right: 10 }}>
                        <a
                          className="ant-btn ant-btn-primary"
                          href={`https://www.facebook.com/sharer/sharer.php?u=https://citati.netlify.com/${item.doc._id}`}
                        >
                            Сподели
                        </a>

                      </div>
                      <div
                        style={{
                          marginLeft: -20,
                          marginBottom: -15,
                        }}
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
