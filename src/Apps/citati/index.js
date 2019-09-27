import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List } from 'antd';
import Helmet from 'helmet';
import { FacebookProvider, Like, ShareButton } from 'react-facebook';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const App = props => {
     const { isIndex, match } = props;
     const [data, setData] = useState({ rows: [{ doc: { text: '', _id: 0 } }] });
     const [query, setQuery] = useState(isIndex ? '' : `&start_key="${match.params.id}"`);
     const [isLoading, setIsLoading] = useState(false);
     const [url, setUrl] = useState(
          `https://pouchdb.herokuapp.com/quotes/_all_docs?include_docs=true&limit=10${query}`
     );

     useEffect(() => {
          const fetchData = async () => {
               setIsLoading(true);
               const result = await axios(url);
               setData(result.data);
               setIsLoading(false);
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
                              <title>{props.title}</title>
                              <meta property="og:url" content={window.location.href} />
                              <meta property="og:type" content="article" />
                              <meta property="og:title" content={data.rows[0].doc.text} />
                              <meta property="og:description" content={props.desc} />
                              <meta
                                   property="og:image"
                                   content={`https://grafix.herokuapp.com/tw/?text=${data.rows[0].doc.text}`}
                              />
                         </Helmet>
                         <div style={{}}></div>
                         <List
                              size="large"
                              //header={<div style={{ backgroundColor: 'red' }}>Header</div>}
                              //footer={<div>Footer</div>}
                              bordered
                              dataSource={data.rows}
                              renderItem={item => (
                                   <List.Item>
                                        <div style={{ marginRight: 90 }}>{item.doc.text}</div>
                                        <div style={{ position: 'absolute', right: 10 }}>
                                             <ShareButton
                                                  className="ant-btn ant-btn-primary"
                                                  href={`http://grafix.herokuapp.com/tw/?text=${item.doc.text}`}
                                             >
                                                  Сподели
                                             </ShareButton>
                                        </div>
                                        <Like
                                             href={`http://grafix.herokuapp.com/tw/?text=${item.doc.text}`}
                                             colorScheme="dark"
                                        />
                                   </List.Item>
                              )}
                         />
                    </div>
               )}
          </FacebookProvider>
     );
};
export default App;
