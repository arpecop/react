import { Avatar, Card, Col, Comment, Row, Tag } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import LazyLoad from 'react-lazy-load';

const uuid = require('uuid/v4');

function TextFormat({ text }) {
  const arr = text.split(' ').map(word => {
    if (word.substring(0, 1) === '#') {
      return { type: 'tag', word, key: uuid() };
    }
    if (word.substring(0, 3) === 'http') {
      return { type: 'url', word: 'xxx', key: uuid() };
    }
    return { word, type: 'word', key: uuid() };
  });
  const cont = arr.map(word => {
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
          <Tag style={{ color: '#161616', backgroundColor: '#95a5a6' }}>{word.word}</Tag>
        </a>
      );
    }
    return <React.Fragment key={word.key}>{`${word.word} `}</React.Fragment>;
  });

  return (
    <div
      style={{
        textOverflow: 'ellipsis',
      }}
    >
      {cont}
    </div>
  );
}
const Komentar = ({ children, item }) => {
  console.log(item);
  let title = item.title || item.text;
  const url = item.urls && item.urls[0] ? item.urls[0] : null;

  title = url ? title.replace(url, '') : title;

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <div
        style={{
          minWidth: 100,
          position: 'absolute',
          right: 0,
          fontSize: 14,
        }}
      />
      <Comment
        // actions={[<span>Reply to</span>]}
        datetime={new Date(Math.round(item.date)).toDateString()}
        author={
          <a href={`/u/${item.screenName}`}>
            <h2 style={{ fontWeight: 'lighter' }}>{item.screenName}</h2>
          </a>
        }
        avatar={
          <LazyLoad offset={200}>
            <Avatar src={`https://avatars.io/twitter/${item.screenName}`} size="large" />
          </LazyLoad>
        }
        content={<TextFormat text={title} />}
      >
        {children}
      </Comment>
    </div>
  );
};

function Item({ item }) {
  const { screenName, quote, images } = item;
  console.log(quote);
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
      <Col xs={24} sm={20} md={18} lg={10}>
        <Card
          bordered={false}
          type="inner"
          cover={
            images ? (
              <LazyLoad offset={200}>
                <a href={href}>
                  <img alt="" style={{ width: '100%' }} src={images[0]} />
                </a>
              </LazyLoad>
            ) : null
          }
        >
          {thread}
        </Card>
      </Col>
    </Row>
  );
}
TextFormat.propTypes = {
  text: PropTypes.string.isRequired,
};
Komentar.propTypes = {
  children: PropTypes.node,
  item: PropTypes.object.isRequired,
};
Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
