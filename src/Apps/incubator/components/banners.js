import React from 'react';
import shuffle from 'lodash/shuffle';

const banners = require('./banners.json');

const WrapperBanner = () => {
  const item = shuffle(banners)[0];
  return (
    <div style={{ textAlign: 'center', marginBottom: 5 }}>

      <a href={item.url} rel="nofollow" target="_top">

        <img src={item.img} style={{ maxWidth: '100%' }} alt="" />

      </a>
    </div>
  );
};
export default WrapperBanner;
