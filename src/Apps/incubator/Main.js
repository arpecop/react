import React from 'react';

const data = 'abcdefghijklmnopqrstuvwxyz'.split('');
const Tag = () => (
  <div>
    {data.map((item) => (
      <li key={item}>
        <a href={`/t/${item}`}>
          {item}
        </a>
      </li>
    ))}
  </div>
);

export default Tag;
