import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import useAxios from 'axios-hooks';
import { Row, Col, Collapse } from 'antd';
import TextFormat from '../incubator/components/TextFormat';

const { Panel } = Collapse;
const Item = ({ item }) => {
  console.log(item);
  return (
    <Col style={{ width: 320, margin: 5 }}>

      <img src={item.thumbnail_resource[2].src} alt="" />
      <Collapse style={{ marginTop: -3 }}>
        <Panel
          header={(
            <>
              {`${item.text.substring(0, 30)} ...`}
            </>
)}
          key={item.media_id}
        >
          <p>
            <TextFormat text={item.text} />
          </p>
        </Panel>
      </Collapse>

    </Col>
  );
};

const Main = () => {
  const [{ data, loading, error }] = useAxios(
    'https://amazonka.herokuapp.com/insta/test',
  );
  return (
    <Row type="flex" justify="center">
      { !loading && !error ? data.medias.map((item) => <Item key={item.media_id} item={item} />) : (<div>Loading</div>)}
    </Row>
  );
};
const Tag = ({ tag }) => {
  const [{ data, loading, error }] = useAxios(
    `https://amazonka.herokuapp.com/insta/${tag}`,
  );
  return (
    <Row type="flex" justify="center">
      { !loading && !error ? data.medias.map((item) => <Item key={item.media_id} item={item} />) : (<div>Loading</div>)}
    </Row>
  );
};

const App = ({ match }) => (
  <>

    {(() => {
      if (match && match.params.id === 't') return <Tag tag={match.params.id2} />;
      if (match && match.params.id === 'i') return <Tag tag={match.params.id2} />;
      return <Main />;
    })()}
    <div style={{
      textAlign: 'center',
      color: '#02bac8',
    }}
    />
  </>
);
export default App;
