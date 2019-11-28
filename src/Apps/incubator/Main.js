import React from 'react';
import { Button } from 'antd';

const Tag = () => {
  const data = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return (
    <div style={{ textAlign: 'center' }}>
      <Button.Group size="small">
        {data.map((item) => (
          <Button type="primary" key={item} href={`/t/${item}`}>
            {item.toUpperCase()}
          </Button>
        ))}
      </Button.Group>
    </div>
  );
};

export default Tag;
