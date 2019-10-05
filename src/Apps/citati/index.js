import React, { Component } from 'react';
import axios from 'axios';
import { List, Button } from 'antd';
import { Helmet } from 'react-helmet';

import { FacebookProvider, ShareButton } from 'react-facebook';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const Footer = props => {
  return <Button type="primary" icon="right" href={'/' + props.lastkey} />;
};
export default class componentName extends Component {
  state = {
    firstkey: 0,
    lastkey: 0,
    isLoading: true,
    data: { rows: [] },
  };
  async componentDidMount() {
    const { isIndex, match } = this.props;
    const query = isIndex ? '' : `&start_key="${match.params.id}"`;
    const url = `https://pouchdb.herokuapp.com/quotes/_all_docs?include_docs=true&limit=20${query}`;
    const result = await axios(url);

    this.setState({
      firstkey: result.data.rows[0].key,
      lastkey: result.data.rows.reverse()[0].key,
      data: result.data,
      isLoading: false,
    });
  }
  render() {
    const { isLoading, data, firstkey, lastkey } = this.state;
    return (
      <FacebookProvider appId="770341770061627">
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" loading />
          </div>
        ) : (
          <div>
            <Helmet>
              <title>{data.rows[0].doc.text}</title>
              <meta property="og:url" content={window.location.href} />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={data.rows[0].doc.text} />

              <meta
                property="og:image"
                content={`https://grafix.herokuapp.com/tw/?text=${data.rows[0].doc.text.replace(/ /gi, '_')}`}
              />
              <meta property="og:image:width" content="617" />
              <meta property="og:image:height" content="324" />
              <meta property="fb:app_id" content="770341770061627" />
            </Helmet>
            <div style={{ padding: 10 }}>
              <List
                size="large"
                header={<div>citati.netlify.com </div>}
                footer={<Footer firstkey={firstkey} lastkey={lastkey} />}
                bordered
                dataSource={data.rows}
                renderItem={(item, i) => (
                  <List.Item>
                    <div style={{ marginRight: 90 }}>
                      {i === 0 ? (
                        <h1 style={{ fontWeight: 100, padding: 0, margin: 0 }}>{item.doc.text} </h1>
                      ) : (
                        <h2 style={{ fontWeight: 100, padding: 0, margin: 0 }}>{item.doc.text} </h2>
                      )}
                    </div>
                    <div style={{ position: 'absolute', right: 10 }}>
                      <ShareButton
                        className="ant-btn ant-btn-primary"
                        href={`https://citati.netlify.com/${item.doc._id}`}
                      >
                        Сподели
                      </ShareButton>
                    </div>
                    <div
                      style={{
                        marginLeft: -20,
                        marginBottom: -15,
                      }}
                    ></div>
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
      </FacebookProvider>
    );
  }
}
