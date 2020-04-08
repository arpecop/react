import React from 'react';

import 'antd/dist/antd.css';

import Wrapper from './Wrapper';
import Applist from './AppList';


const App = (props) => {
  const { match } = props;

  return ((() => {
    if (match && match.params.id === 'banica') {
      return (
        <Wrapper props={props} title="🎄 Новогодишна баница с късмети 2020 🎄" app="banica">
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
      );
    } if (match && match.params.id === 'quote') {
      return (
        <Wrapper props={props} title="🎄 Изтегли си цитат-късметче 🎄" app="quote">
          <div style={{ height: 599, width: 633, textAlign: 'center' }}>
            <img src={`/quotes/${Math.floor((Math.random() * 255) + 0)}.png`} style={{ marginTop: 80, zIndex: 100 }} alt="" />
            <img
              src={`https://graph.facebook.com/${match ? match.params.start_key : null}/picture?type=large`}
              style={{
                position: 'fixed',
                maxWidth: 110,
                left: 262,
                top: 25,
                borderRadius: '50%',
              }}
              alt=""
            />
          </div>
        </Wrapper>
      );
    }

    return <Applist />;
  })());
};
export default App;
