import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import User from './User';
import Tag from './Tag';
import Main from './Main';
import Top from './Top';
import { Body } from './components/UI';
import './components/index.css';

const App = ({ match }) => (
  <Body>
    <div className="headertop">
      <img src="/twitterlogo.png" alt="" />
    </div>
    <Top />
    {(() => {
      if (match && match.params.id === 'u') return <User user={match.params.id2} />;
      if (match && match.params.id === 't') return <Tag tag={match.params.id2} />;
      return <Main />;
    })()}
  </Body>
);
export default App;
