import React, { useEffect } from 'react';

import { useImmer } from 'use-immer';
import axios from 'axios';
import {
  List, Button, Row, Col,
} from 'antd';
import { Helmet } from 'react-helmet';


import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


const Footer = ({ lastkey }) => <Button type="primary" icon="right" href={`/${lastkey}`} />;
window.oncontextmenu = function (e) {
  e.preventDefault();
};

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

  useEffect(() => {
    async function mount() {
      const result = await axios(`https://db.arpecop.xyz/kartinki/_design/api/_view/md5?limit=1&${query}`);
      const resultAll = await axios(`https://db.arpecop.xyz/kartinki/_design/api/_view/md5?limit=10${query1}`);
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
            <title>Kartinki</title>
            <meta property="og:url" content={`https://citati.netlify.com/${result.rows[0].id}`} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content="Kartinki" />

            <meta
              property="og:image"
              content={`https://grafix.herokuapp.com/tw/?db=quotes&id=${result.rows[0]._id}`}
            />

            <meta property="fb:app_id" content="770341770061627" />
            <script type="text/javascript" src="//st-n.ads1-adnow.com/js/a.js" />
          </Helmet>
          <div>
            <Row type="flex" justify="center" align="top">
              <Col>
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

                        <h2 style={{ fontWeight: 100, padding: 0, margin: 0 }}>

                          <img style={{ maxWidth: '100%', margin: 'auto' }} src={`https://s3.eu-west-1.amazonaws.com/imgserve.fbook.space/${item.key}.jpg`} alt="" />
                        </h2>

                      </div>


                      <a
                        className="ant-btn ant-btn-primary"
                        href={`https://www.facebook.com/sharer/sharer.php?u=https://kartinki.netlify.com/${item._id}`}
                      >
                            Сподели
                      </a>


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
