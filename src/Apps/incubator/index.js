import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import User from './User';
import Tag from './Tag';
import Main from './Main';
import { HeaderTop, Body } from './components/UI';

const App = props => {
  const { match, isIndex } = props;

  return (
    <Body>
      <div className="headertop">
        <img src="/twitterlogo.png"></img>
      </div>
      {match && match.params.id === 'u' ? <User user={match.params.id2} /> : null}
      {match && match.params.id === 't' ? <Tag tag={match.params.id2} /> : null}
      {isIndex ? <Main /> : null}
    </Body>
  );
};
export default App;
