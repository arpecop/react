import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Meta } from './src/meta';

const getApi = async url => {
  return new Promise(resolve => {
    axios.get(`https://grafix.herokuapp.com/db/news/${url}`).then(res => {
      resolve(res.data);
    });
  });
};

class NightChat extends Component {
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
    const arts = await getApi('_all_docs?limit=50&descending=true&include_docs=true');

    const single = await getApi(isIndex ? '' : match.params.id);

    this.setState({
      singles: arts.rows,
      single,
      // single
    });
  }

  render() {
    const { isIndex, singles, single } = this.state;

    return (
      <>
        {isIndex || !single ? null : (
          <>
            <Meta single={single}></Meta>
            <Row type="flex" justify="center">
              <Col xs={22} sm={22} md={20} lg={19} xl={15}>
                <h3 style={{ fontWeight: 100 }}>{single.title}</h3>
                <Card
                  hoverable
                  style={{ border: 'none' }}
                  cover={
                    single.urlToImage ? (
                      <div style={{ textAlign: 'center' }}>
                        <LazyLoadImage alt="example" style={{ maxWidth: '100%' }} src={single.urlToImage} />
                      </div>
                    ) : null
                  }
                />
                {single.content}
                <a href={single.url} rel="nofollow">
                  {`  source:  ${single.source.name} »`}
                </a>
              </Col>
            </Row>
          </>
        )}

        <Row type="flex" justify="center">
          {singles.map(item => (
            <Col xs={22} sm={20} md={15} lg={11} xl={5} key={item.key}>
              <a href={`/${item.key}`}>
                <Card
                  hoverable
                  style={{ border: 'none' }}
                  cover={
                    item.doc.image ? (
                      <div style={{ textAlign: 'center' }}>
                        <LazyLoadImage alt="example" src={item.doc.urlToImage} style={{ width: '100%' }} />
                      </div>
                    ) : null
                  }
                >
                  <Card.Meta title={item.doc.title} />
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </>
    );
  }
}
export default NightChat;
