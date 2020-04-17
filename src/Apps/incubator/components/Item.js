import React from 'react';
import {
  Avatar, Card, Col, Comment, Row,
} from 'antd';
import TimeAgo from 'react-timeago';
import WrapperBanner from './banners';
import TextFormat from './TextFormat';

function removeUrls(string) {
  const x = string.split(' ').filter((item) => item.includes('#')).map((item) => item.replace('#', ''));
  return x.join(' ');
}


const Komentar = ({ item }) => {
  let title = item.title || item.text;
  const url = item.urls && item.urls[0] ? item.urls[0] : null;

  title = url ? title.replace(url, '') : title;

  return (


    <Comment


      datetime={<TimeAgo date={new Date(parseInt(item.date, 10))} />}
      author={(
        <a href={`/u/${item.screenName}`}>
          <h2 style={{ fontWeight: 'lighter', color: '#ccc' }}>
            {item.screenName}
          </h2>
        </a>
        )}
      avatar={(<Avatar src={`https://avatars.io/twitter/${item.screenName}`} size="large" />)}
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
const Item = ({ item, i }) => {
  const {
    screenName, quote, images, title,
  } = item;

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
      <Col xs={23} sm={20} md={18} lg={10}>
        {i === 1 || i === 3 ? (<WrapperBanner />) : null}
        <Card
          style={{ marginBottom: 5, backgroundColor: '#231f20' }}
          bordered={false}
          type="inner"
          cover={
            images ? (<img alt={removeUrls(title)} style={{ width: '100%' }} src={images[0]} />) : null
          }
        >
          {thread}
        </Card>
      </Col>
    </Row>
  );
};

export default Item;
