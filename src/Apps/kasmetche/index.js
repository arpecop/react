import React from 'react';

import 'antd/dist/antd.css';

import Wrapper from './Wrapper';

const App = (props) => {
  const { match } = props;
  return (
    <>
      <Wrapper props={props} title="🎄 Коледна баница с късмети 🎄">
        <div style={{ height: 599 }}>
          <img
            src={`https://graph.facebook.com/${match ? match.params.start_key : null}/picture?type=large`}
            style={{
              position: 'fixed', maxWidth: 110, left: 262, top: 45,
            }}
            alt=""
          />
          <img src="/banica/bg.png" style={{ position: 'fixed' }} alt="" />
          <img src={`/banica/${Math.floor((Math.random() * 30) + 0)}.png`} style={{ position: 'fixed', top: 190, left: 205 }} alt="" />
        </div>
      </Wrapper>
    </>
  );
};
export default App;
