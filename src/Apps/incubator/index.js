import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import User from './User';

import Main from './Main';
import { Body } from './components/UI';
import Links from '../news/links';
import './components/index.css';

const App = ({ match }) => (
  <Body>
    <div className="headertop">
      <img src="/twitterlogo.png" alt="" />
    </div>

    {(() => {
      if (match && match.params.id === 'u') {
        return <User user={match.params.id2} />;
      }
      if (match && match.params.id === 't') {
        return <Main tag={match.params.id2} />;
      }
      return <Main />;
    })()}
    <div
      style={{
        textAlign: 'center',
        color: '#02bac8',
      }}
    >
      <div>
        <Links />
      </div>
      RudixLabs © 2019 : the site is not associated or affiliated with Twitter
    </div>
  </Body>
);
export default App;
