/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-param-reassign */

import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import axios from 'axios';
import {
  List, Button, Row, Col, Tag, Icon, Collapse,
} from 'antd';
import { Helmet } from 'react-helmet';
import uuid from 'react-uuid';

import 'antd/dist/antd.css';

import './style.css';

const { Panel } = Collapse;

const cats = [
//  { value: 11107, key: 'Разни' },
  { value: 179, key: 'Адвокати' },
  { value: 104, key: 'Бай Ганьо' },
  { value: 8393, key: 'Бисери' },
  { value: 1692, key: 'Блондинки' },
  { value: 493, key: 'Борци' },
  { value: 326, key: 'Военни' },
  { value: 274, key: 'Гадории' },
  { value: 1763, key: 'Животни' },
  { value: 1542, key: 'Иванчо' },
  { value: 1052, key: 'Лекари' },
  { value: 2586, key: 'Любими Герои' },
  { value: 3412, key: 'Мръсни' },
  { value: 1513, key: 'Пиянски' },
  { value: 2083, key: 'Политически' },
  { value: 441, key: 'Полицаи' },
  { value: 1878, key: 'Програмисти' },
  { value: 416, key: 'Проститутки' },
  { value: 3098, key: 'Професионални' },
  { value: 440, key: 'Радио Ереван' },
  { value: 8741, key: 'Семейни' },
  { value: 838, key: 'Спортни' },
  { value: 829, key: 'Студентски' },
  { value: 330, key: 'Тъпизми' },
  { value: 548, key: 'Ученически' },
  { value: 2138, key: 'Черен хумор' },
];

const JokeBr = ({ joke }) => joke.split('\n').map((item2) => (
  <span key={uuid()}>
    {item2}
    <br />
  </span>
));

const Content = ({ item }) => (
  <div style={{
    padding: 0, margin: 0,
  }}
  >
    <a style={{ float: 'right' }} href="https://play.google.com/store/apps/details?id=com.rudixlabs.jokes2"><Tag color="magenta" style={{ margin: 5 }}>{item.doc.cat}</Tag></a>
    <a href={`/${item.doc._id}`}>
      <JokeBr joke={item.doc.joke} />
    </a>
    <p> </p>
    <a
      style={{ backgroundColor: '#3b5998', border: 'none' }}
      className="ant-btn ant-btn-primary ant-btn-round"
      href={`https://www.facebook.com/sharer/sharer.php?u=https://${window.location.hostname}/${item.doc._id}`}
    >
      <Icon type="facebook" />
      {' Сподели'}
    </a>

  </div>
);


const App = (props) => {
  const [state, setState] = useImmer({
    firstkey: 0,
    lastkey: 0,
    isLoading: true,
    collapsed: true,
    result: { rows: [] },
    resultAll: { rows: [] },
  });
  const { isIndex, match } = props;
  useEffect(() => {
    async function mount() {
      const query1 = isIndex ? '' : match.params.id;
      const result = await axios(`https://pouchdb.herokuapp.com/jokes/${query1}`);
      const measures = await axios(`https://grafix.herokuapp.com/?text=${isIndex ? 'x' : result.data.joke.replace(/\n/g, 'br')}`);
      setState((draft) => {
        draft.result = result.data;
        draft.measures = measures.data;
        draft.isLoading = false;
      });
    }
    async function mount2() {
      const query2 = isIndex ? '' : `&skip=${Math.floor(Math.random() * 59979)}`;
      const resultAll = await axios(`https://pouchdb.herokuapp.com/jokes/_all_docs?include_docs=true&limit=20${query2}`);
      setState((draft) => {
        draft.resultAll = resultAll.data;
      });
    }
    mount();
    mount2();
  }, []);
  const {
    isLoading, resultAll, measures, result,
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
              <meta property="og:url" content={`https://${window.location.hostname}/${match.params.id}`} />
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

          <Row type="flex" justify="center" align="top" style={{ padding: 10 }}>

            <Col xs={23} sm={20} md={16} lg={15} xl={12}>

              <Collapse defaultActiveKey={['1', '2']}>
                <Panel header="😃 ВИЦ НА ДЕНЯ" key="1">
                  {result.joke
                    ? <Content item={{ doc: result }} />
                    : <Content item={{ doc: resultAll.rows[0].doc }} />}
                </Panel>
                <Panel
                  header="🤣 ОТ ДНЕС"
                  key="2"
                >
                  <List
                    size="large"
                    dataSource={resultAll.rows}
                    renderItem={(item) => (
                      <List.Item>
                        <Content item={item} />
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
            </Col>
          </Row>

          <div style={{ textAlign: 'center' }}>
            {cats.map((item1) => (<a key={uuid()} href="https://play.google.com/store/apps/details?id=com.rudixlabs.jokes2"><Tag color="magenta" style={{ margin: 5 }}>{item1.key}</Tag></a>))}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
