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
  {
    url: 'https://www.amazon.com/dp/B002I0J4VQ?tag=rudix-20&linkCode=ur1',
    img: 'https://images-na.ssl-images-amazon.com/images/G/01/img09/video-games/associates/leaderboard/amazon-ps3-120_728x90.png',
  },
  {
    url: 'https://www.zazzle.co.uk/tanktops?rf=238112296902500890&CMPN=ban_custom_tank_tops_2015',
    img: 'https://asset.zcache.co.uk/assets/graphics/z4/uniquePages/banners/Tank_Tops_2015_728x90.jpg',
  },
  {
    url: 'https://www.amazon.com/b?tag=rudix-20&linkCode=ur1&node=5174',
    img: 'https://images-na.ssl-images-amazon.com/images/G/01/img09/associates/med-rec/music_med-rec.gif',
  },
  {
    url: 'https://www.amazon.com/music/unlimited/hd?tag=rudix-20&linkCode=ur1',
    img: 'https://images-na.ssl-images-amazon.com/images/G/01/associates/080119_US_Katana_ACQ_PD_eg_CV8E_468x60._CB1569025332_.jpg',
  },
  {
    url: 'https://www.amazon.com/dp/B074TJCK8Y/ref=twister_B06XDGTPDP?tag=rudix-20&linkCode=ur1&_encoding=UTF8&psc=1',
    img: 'https://www.amazon.com/dp/B074TJCK8Y/ref=twister_B06XDGTPDP?tag=rudix-20&linkCode=ur1&_encoding=UTF8&psc=1',
  },
];
const WrapperBanner = () => {
  const item = shuffle(banners)[0];
  return (
    <div style={{ textAlign: 'center' }}>
      <a href={item.url} rel="nofollow" target="_top">
        <img src={item.img} style={{ maxWidth: '100%' }} alt="" />
      </a>
    </div>
  );
};
export default WrapperBanner;
