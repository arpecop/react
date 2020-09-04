import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { post } from './components/useFetch';

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
const Tag = () => {
  const [random, setRandom] = useState({ Items: [] });
  useEffect(() => {
    const fetchData = async () => {
      const getSimilar = await post({
        collection: 't',
        id: getRandom(1593543944006, 1594365665452),
        limit: 120,
        descending: true,
      });

      setRandom(getSimilar.data);
    };

    fetchData();
  }, []);
  return (
    <div style={{ textAlign: 'center' }}>

      {random.Items.map((item) => (
        <Button style={{ margin: 5 }} type="primary" key={item.vreme} href={`/u/${item.u}`}>
          {item.u.toUpperCase()}
        </Button>
      ))}

    </div>
  );
};

export default Tag;
