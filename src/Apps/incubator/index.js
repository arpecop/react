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
      <div
        style={{ border: '2px solid #FBBB15', backgroundColor: '#f5f6fa' }}
      >
        <img
          src="https://userz.net/img/amazon.jpg"
          alt="amazon hot deals"
          style={{ maxWidth: '100%' }}
        />
        <h1 style={{ padding: 0, margin: 0, textAlign: 'center' }}>
          Shop from Amazon hot Deals for 2021
        </h1>
        <ul style={{ width: '50%', float: 'right' }}>
          <li>
            <a href="https://amzn.to/3mPKTYr" rel="nofollow">
              Home & Kitchen
            </a>
          </li>
          <li>
            <a href="https://amzn.to/34LANS3" rel="nofollow">
              Electronics
            </a>
          </li>
          <li>
            <a href="https://amzn.to/2M0qcfw" rel="nofollow">
              Toys & Games
            </a>
          </li>
          <li>
            <a href="https://amzn.to/34HW8Ms" rel="nofollow">
              Cell Phones & Accessories
            </a>
          </li>
          <li>
            <a href="https://amzn.to/38Chzzt" rel="nofollow">
              Clothing, Shoes & Jewelry
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="https://amzn.to/3hkrtdd" rel="nofollow">
              Baby
            </a>
          </li>
          <li>
            <a href="https://amzn.to/3rtELbI" rel="nofollow">
              Video Games
            </a>
          </li>
          <li>
            <a href="https://amzn.to/3rxMHci" rel="nofollow">
              Home & Business Services
            </a>
          </li>
          <li>
            <a href="https://amzn.to/3nUw5ZRR" rel="nofollow">
              CDs & Vinyl
            </a>
          </li>
          <li>
            <a href="https://amzn.to/34KJFrn" rel="nofollow">
              Books
            </a>
          </li>
        </ul>
      </div>
      RudixLabs © 2019 : the site is not associated or affiliated with
      Twitter
    </div>
  </Body>
);
export default App;
