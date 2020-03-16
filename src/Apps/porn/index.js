import React from 'react';
import useAxios from 'axios-hooks';
import { Helmet } from 'react-helmet';
import { Tag } from 'antd';
import 'antd/dist/antd.css';
// or 'antd/dist/antd.less'
function App(props) {
  const { isIndex, match } = props;
  const [{ data, loading }] = useAxios(
    `https://db.arpecop.xyz/porn/_all_docs?limit=25&include_docs=true&${isIndex ? '' : `&start_key="${match.params.id}"`}`,
  );

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Helmet>
        <title>{data.rows[0].doc.t}</title>
        <meta name="google-site-verification" content="PpcXwvxVoie3FL806wiJD3i3U-lBT2cA0mjU3OWCqW0" />
      </Helmet>
      <h1>{data.rows[0].doc.t}</h1>
      <div style={{ textAlign: 'center' }}>
        {data.rows.map((item) => (
          <Tag>
            <a href={item.id}>{item.doc.t}</a>
          </Tag>
        ))}
      </div>
    </div>
  );
}
export default App;
