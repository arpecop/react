import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import User from './User';
import Tag from './Tag';
import Main from './Main';
import Bottom from './Bottom';
const App = props => {
  const { match, isIndex } = props;

  return (
    <div>
      {match && match.params.id === 'u' ? (
        <div>
          <User user={match.params.id2} />
          <Bottom tag={match.params.id2}></Bottom>
        </div>
      ) : null}
      {match && match.params.id === 't' ? (
        <div>
          <Tag tag={match.params.id2} />
          <Bottom tag={match.params.id2}></Bottom>
        </div>
      ) : null}
      {isIndex ? <Main /> : null}
    </div>
  );
};
export default App;
