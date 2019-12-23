import React from 'react';

import 'antd/dist/antd.css';

import { Tag } from 'antd';
import { keywords } from './keywords';

function Shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const keys = Shuffle(keywords).slice(0, 25);


const App = () => (<div>{keys.map((item) => (<a href={`/${item}`} key={item}><Tag style={{ cursor: 'pointer' }}>{item}</Tag></a>))}</div>);

export default App;
