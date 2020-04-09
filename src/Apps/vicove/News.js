import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';


const getApi = async (url) => new Promise((resolve) => {
  axios.get(`https://pouchdb.herokuapp.com/chetiva/${url}`).then((res) => {
    resolve(res.data);
  });
});

const Refine = (item) => {
  if (item.item && item.item.tag === 'p' && item.item.child) {
    return <p>{item.item.child[0].text}</p>;
  }
  if (item.item && item.item.tag === 'img') {
    return (
      <div style={{ textAlign: 'center' }}>
        <LazyLoadImage
          alt="example"
          src={item.item.attr.src}
          style={{ maxWidth: '100%', margin: 'auto' }}
        />
      </div>
    );
  }
  if (item.item.text) {
    return null;
  }
  return null;
};

class News extends Component {
  constructor(props) {
    super();
    this.state = {
      isIndex: props.isIndex,
      singles: [],
      single: null,
    };
  }

  async componentDidMount() {
    const { isIndex } = this.state;
    const { match } = this.props;
    const arts = await getApi('_design/i/_view/News?limit=20&descending=true');


    this.setState({
      singles: arts.rows,

      // single
    });
  }

  render() {
    const { singles } = this.state;

    return (
      <>


        <Row type="flex" justify="center">
          {singles.map((item) => (
            <Col xs={22} sm={20} md={15} lg={11} xl={5} key={item.key}>
              <a href={`http://novinata.netlify.com/${item.key}`}>
                <Card
                  hoverable
                  style={{ border: 'none' }}
                  cover={item.value.image ? (
                    <div style={{ textAlign: 'center' }}>
                      <LazyLoadImage
                        alt="example"
                        src={item.value.image}
                        style={{ width: '100%' }}
                      />
                    </div>
                  ) : null}
                >
                  <Card.Meta title={item.value.title} />
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </>
    );
  }
}
export default News;
