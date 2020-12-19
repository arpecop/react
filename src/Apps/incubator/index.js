import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import User from './User';

import Main from './Main';
import { Body } from './components/UI';
import Links from '../news/links';
import './components/index.css';
import WrapperBanner from './components/banners';

const App = ({ match }) => (
  <Body>
    <div className="headertop">
      <img src="/twitterlogo.png" alt="" style={{ maxWidth: '100%' }} />
    </div>
    <WrapperBanner />
    {(() => {
      if (match && match.params.id === 'u') {
        return <User user={match.params.id2} />;
      }
      if (match && match.params.id === 't') {
        return <Main tag={match.params.id2} />;
      }
      return <Main tag="cool" />;
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
      RudixLabs © 2019 : the site is not associated or affiliated with
      Twitter
    </div>
  </Body>
);
export default App;
