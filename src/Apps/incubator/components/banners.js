import React from 'react';
import shuffle from 'lodash/shuffle';

const banners = [
  {
    img: 'https://asset.zcache.co.uk/assets/graphics/z4/uniquePages/banners/Baby_Hub_2015_728x90.1_2X.jpg',
    url: 'https://www.zazzle.co.uk/baby+gifts?rf=238112296902500890&CMPN=ban_custom_cuteness',
  },
  {
    url: 'https://www.zazzle.co.uk/?rf=238112296902500890&CMPN=ban_zazzle_shop_create',
    img: 'https://asset.zcache.co.uk/assets/graphics/z4/uniquePages/banners/zazzleLogo_shopCreate_468x60.jpg',
  },
];
const WrapperBanner = () => {
  const item = shuffle(banners)[0];
  return (
    <div style={{ textAlign: 'center' }}>
      <a href={item.url} rel="nofollow">
        <img src={item.img} style={{ maxWidth: '100%' }} alt="" />
      </a>
    </div>
  );
};
export default WrapperBanner;
