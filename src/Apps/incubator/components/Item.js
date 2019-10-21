import React from 'react';
import {
  Avatar, Card, Col, Comment, Row, Tag,
} from 'antd';


import TimeAgo from 'react-timeago';

const uuid = require('uuid/v4');

function TextFormat({ text }) {
  const arr = text.split(' ').map((word) => {
    if (word.substring(0, 1) === '#') {
      return { type: 'tag', word, key: uuid() };
    }
    if (word.substring(0, 3) === 'http') {
      return { type: 'url', word: 'xxx', key: uuid() };
    }
    return { word, type: 'word', key: uuid() };
  });
  const cont = arr.map((word) => {
    if (word.type === 'url') {
      return <React.Fragment key={word.key}>dsdsxxxxx</React.Fragment>;
    }
    if (word.type === 'tag') {
      return (
        <a
          key={word.key}
          href={`/t/${word.word
            .toLowerCase()
            .replace('#', '')
            .replace('.', '')}`}
        >
          <Tag style={{ color: '#161616', cursor: 'pointer' }}>{word.word.replace('#', '')}</Tag>
        </a>
      );
    }
    return <React.Fragment key={word.key}>{`${word.word} `}</React.Fragment>;
  });

  return cont;
}
const Komentar = ({ children, item }) => {
  let title = item.title || item.text;
  const url = item.urls && item.urls[0] ? item.urls[0] : null;

  title = url ? title.replace(url, '') : title;

  return (
  // eslint-disable-next-line react/jsx-filename-extension


    <Comment

        // actions={[<span>Reply to</span>]}
      datetime={<TimeAgo date={new Date(parseInt(item.date, 10))} />}
      author={(
        <a href={`/u/${item.screenName}`}>
          <h2 style={{ fontWeight: 'lighter' }}>{item.screenName}</h2>
        </a>
        )}
      avatar={(

        <Avatar src={`https://avatars.io/twitter/${item.screenName}`} size="large" />

        )}
      content={<h3 style={{ fontWeight: 'lighter' }}><TextFormat text={title} /></h3>}
    >
      {children}
    </Comment>

  );
};
const Item = ({ item }) => {
  const { screenName, quote, images } = item;

  const href = `/u/${screenName}`;
  const thread = quote ? (
    <Komentar item={quote} href={href}>
      <Komentar item={item} href={href} />
    </Komentar>
  ) : (
    <Komentar item={item} href={href} />
  );
  return (
    <Row type="flex" justify="center">
      <Col xs={24} sm={20} md={18} lg={10} style={{ float: 'left' }}>
        <Card
          bordered={false}
          type="inner"
          cover={
            images ? (<img alt={quote} style={{ width: '100%' }} src={images[0]} />) : null
          }
        >
          {thread}
        </Card>
      </Col>
    </Row>
  );
};

export default Item;
