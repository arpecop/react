import React from 'react';
import useAxios from 'axios-hooks';
import { Helmet } from 'react-helmet';
import { Tag } from 'antd';
import 'antd/dist/antd.css';
// or 'antd/dist/antd.less'
function App(props) {
  const { isIndex, match } = props;
  const [{ data, loading, error }] = useAxios(
    `https://db.arpecop.xyz/porn/_all_docs?limit=25&include_docs=true&${isIndex ? '' : `&start_key="${match.params.id}"`}`,
  );

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Helmet>
        <title>{data.rows[0].doc.t}</title>
        <meta
          property="og:url"
          content={`https://kartinki.netlify.com/${data.rows[0].key}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="kartinki" />

        <meta
          property="og:image"
          content={`https://s3.eu-west-1.amazonaws.com/imgserve.fbook.space/${data.rows[0].value.md5}.jpg`}
        />
        <meta property="og:image:width" content={data.rows[0].value.w} />
        <meta property="og:image:height" content={data.rows[0].value.h} />
        <meta property="fb:app_id" content="770341770061627" />
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
