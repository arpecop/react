import React from 'react';
import {
  Avatar, Card, Col, Comment, Row,
} from 'antd';
import TimeAgo from 'react-timeago';
import WrapperBanner from './banners';
import TextFormat from './TextFormat';

const Komentar = ({ item }) => {
  let title = item.title || item.text;
  const url = item.urls && item.urls[0] ? item.urls[0] : null;

  title = url ? title.replace(url, '') : title;

  return (

    <Comment
      datetime={<TimeAgo date={new Date(item.created_at)} />}
      author={(
        <a href={`/u/${item.user.screen_name}`}>
          <h2 style={{ fontWeight: 'lighter', color: '#ccc' }}>
            {item.user.screen_name}
          </h2>
        </a>
        )}
      avatar={(<Avatar src={item.user.profile_image_url_https} size="large" />)}
      content={item.replyCount ? (
        <>

          <span style={{ color: '#fff' }}><TextFormat text={title} /></span>
          <span style={{ color: '#FFF' }}>

            {` ${item.replyCount}    `}
          </span>
          <span style={{ color: '#FFF' }}>

            {` ${item.retweetCount}    `}
          </span>
          <span style={{ color: '#FFF' }}>

            {` ${item.favoriteCount}  `}
          </span>
        </>
      ) : (<span style={{ fontWeight: 'lighter', color: '#fff', fontSize: '0.9rem' }}><TextFormat text={title} /></span>)}
    />
  );
};
const Item = ({ item, i, user }) => {
  const {
    quote,
  } = item;

  const href = `/u/${user}`;
  const thread = quote ? (
    <Komentar item={quote} href={href}>
      <Komentar item={item} href={href} />
    </Komentar>
  ) : (
    <Komentar item={item} href={href} />
  );
  return (
    <Row type="flex" justify="center">
      <Col xs={23} sm={20} md={18} lg={10}>
        {i === 1 || i === 3 ? <WrapperBanner /> : null}
        <Card
          style={{ marginBottom: 5, backgroundColor: '#231f20' }}
          bordered={false}
          type="inner"
          cover={
                 item.entities.media ? (
                   <img
                     alt=""
                     style={{ width: '100%' }}
                     src={item.entities.media[0].media_url_https}
                   />
                 ) : null
              }
        >
          {thread}
        </Card>
      </Col>
    </Row>
  );
};

export default Item;
