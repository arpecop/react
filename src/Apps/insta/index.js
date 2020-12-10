import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import useAxios from 'axios-hooks';
import { Row, Col, Collapse } from 'antd';
import TextFormat from '../incubator/components/TextFormat';

const { Panel } = Collapse;

const App = ({ match }) => (
  <>
    {(() => {
      if (match && match.params.id === 't') { return <Tag tag={match.params.id2} />; }
      if (match && match.params.id === 'i') { return <Tag tag={match.params.id2} />; }
      return <Main />;
    })()}
    <div
      style={{
        textAlign: 'center',
        color: '#02bac8',
      }}
    />
  </>
);
export default App;
