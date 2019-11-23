import React from 'react';

import 'antd/dist/antd.css';

import Wrapper from './Wrapper';

const Applist = () => {
  const apps = [{
    title: '🎄 Коледна баница с късмети 🎄',
    slug: 'banica',
  }, {
    title: '🎄 Изтегли си цитат-късметче 🎄',
    slug: 'quote',
  }];

  return apps.map((item) => (<h2 key={item.slug}><a href={item.slug}>{item.title}</a></h2>));
};

const App = (props) => {
  const { match } = props;

  return (
    <div
      className="App"
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'inline-block' }}>
        {(() => {
          if (match && match.params.id === 'banica') {
            return (
              <Wrapper props={props} title="🎄 Коледна баница с късмети 🎄" app="banica">
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
                  <img src={`/quotes/${Math.floor((Math.random() * 255) + 0)}.png`} style={{ marginTop: 90, zIndex: 100 }} alt="" />
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
          // if (match && match.params.id === 't') return <Tag tag={match.params.id2} />;
          return <Applist />;
        })()}

      </div>

    </div>
  );
};
export default App;
