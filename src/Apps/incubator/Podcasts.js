import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row } from 'antd';
import { Title } from './components/UI';

const { Meta } = Card;
const Item = ({ item }) => (
  <Card
    hoverable
    style={{ width: 240, margin: 5, float: 'left' }}
    cover={<img alt="example" src={item.artworkUrl100} />}
  >
    <Meta title={item.artistName} description={item.collectionCensoredName} />
  </Card>
);
const Podcasts = ({ tag, length }) => {
  const [data, setData] = useState({ rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://rudixauth.herokuapp.com/test/pod/_design/api/_view/podcasts?start_key="${tag}"&reduce=false&include_docs=true&limit=11&update=false&descending=true`,
      );
      setData(result.data);
    };
    fetchData();
  }, [tag]);
  return (
    <div style={{ width: '70%', margin: 'auto' }}>

      {length <= 1 ? (
        <div>
          <Title>Podcasts</Title>
          <Row type="flex" justify="center">

            {data.rows.map((item) => (
              <Item key={item.key} item={item.doc} />
            ))}
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default Podcasts;
