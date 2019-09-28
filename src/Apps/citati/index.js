import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Radio } from 'antd';
import { Helmet } from 'react-helmet';

import { FacebookProvider, ShareButton } from 'react-facebook';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { log } from 'util';

const Footer = ({ firstkey, lastkey }) => {
     const handleSizeChange = ({ target }) => {
          if (target.value === 'next') {
               console.log('next');
               window.location.href = window.location + '' + lastkey;
          } else {
               console.log('prev');
               window.location.href = window.location + '' + firstkey;
          }
     };

     return (
          <div>
               <h1>{firstkey}</h1>
               <Radio.Group onChange={handleSizeChange}>
                    <Radio.Button value="prev">Large</Radio.Button>

                    <Radio.Button value="next">Small</Radio.Button>
               </Radio.Group>
          </div>
     );
};

const App = props => {
     const { isIndex, match } = props;
     const [data, setData] = useState({ rows: [{ doc: { text: '', _id: 0 } }] });
     const [lastkey, setlastkey] = useState('xxx');
     const [firstkey, setfirsttkey] = useState('xxx');
     const query = isIndex ? '' : `&start_key="${match.params.id}"`;
     const [isLoading, setIsLoading] = useState(false);
     const url = `https://pouchdb.herokuapp.com/quotes/_all_docs?include_docs=true&limit=20${query}`;

     useEffect(() => {
          const fetchData = async () => {
               setIsLoading(true);
               const result = await axios(url);
               setData(result.data);
               setIsLoading(false);
               setfirsttkey(result.data.rows[0].key);
               setlastkey(result.data.rows.reverse()[0].key);
          };
          fetchData();
     }, [url]);

     return (
          <FacebookProvider appId="770341770061627">
               {isLoading ? (
                    <div>Loading ...</div>
               ) : (
                    <div>
                         <Helmet>
                              <title>{data.rows[0].doc.text}</title>
                              <meta property="og:url" content={window.location.href} />
                              <meta property="og:type" content="article" />
                              <meta property="og:title" content={data.rows[0].doc.text} />
                              <meta property="og:description" content={props.desc} />
                              <meta
                                   property="og:image"
                                   content={`https://grafix.herokuapp.com/tw/?text=${data.rows[0].doc.text.replace(
                                        / /gi,
                                        '_'
                                   )}`}
                              />
                              <meta property="og:image:width" content="617" />
                              <meta property="og:image:height" content="324" />
                              <meta property="fb:app_id" content="770341770061627" />
                         </Helmet>
                         <div style={{ padding: 10 }}>
                              <List
                                   size="large"
                                   header={<div>citati.netlify.com </div>}
                                   //header={<Footer firstkey={firstkey} lastkey={lastkey} />}
                                   bordered
                                   dataSource={data.rows}
                                   renderItem={(item, i) => (
                                        <List.Item>
                                             <div style={{ marginRight: 90 }}>
                                                  {i === 0 ? (
                                                       <h1 style={{ fontWeight: 100, padding: 0, margin: 0 }}>
                                                            {item.doc.text}{' '}
                                                       </h1>
                                                  ) : (
                                                       <h2 style={{ fontWeight: 100, padding: 0, margin: 0 }}>
                                                            {item.doc.text}{' '}
                                                       </h2>
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
};
export default App;
